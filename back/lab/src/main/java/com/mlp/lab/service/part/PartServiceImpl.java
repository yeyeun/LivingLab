package com.mlp.lab.service.part;

import org.springframework.stereotype.Service;

import com.mlp.lab.dto.PartUserDto;
import com.mlp.lab.dto.PartUserListDto;
import com.mlp.lab.entity.Part;
import com.mlp.lab.entity.PartUser;
import com.mlp.lab.entity.Team;
import com.mlp.lab.entity.User;
import com.mlp.lab.repository.PartRepository;
import com.mlp.lab.repository.PartUserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class PartServiceImpl implements PartService {

  private final PartRepository partRepository;

  private final PartUserRepository partUserRepository;

  // 참여목록에 참여하기
  @Override
  public List<PartUserListDto> add(PartUserDto partUserDto, Long teamNo) {

    // String email = partUserDto.getEmail();
    String nickname = partUserDto.getNickname();
    Long id = partUserDto.getId(); // userId
    // Long pno = partUserDto.getPno();
    Long pino = partUserDto.getPino();
    // Long teamNo = partUserDto.getTeamNo();

    // 참여목록에 이미 회원이 등록된 경우 (장바구니 아이템 번호가 있어서 수량변경만 하는 경우)
    if (pino != null) {
      log.info(nickname + "님은 이미 참가 등록된 회원입니다!");
      return getPartUsers(teamNo);
    }

    // 참여목록에 회원이 없는 경우
    // 게시물의 참여목록
    Part part = getPart(teamNo);

    PartUser partUser = null;

    partUser = partUserRepository.getUserOfPno(teamNo, id);

    if (partUser == null) {
      // 참여목록에 회원이 없는 경우
      User user = User.builder().id(id).nickname(nickname).build();
      partUser = PartUser.builder().user(user).part(part).build();
    }
    partUserRepository.save(partUser);

    return getPartUsers(teamNo);
  }

  private Part getPart(Long teamNo) {
    // 해당 동네모임 게시물(teamNo)의 참여목록(Part)이 있는지 확인, 있으면 반환
    // 없으면 Part 객체 생성하고 추가 반환

    Part part = null;

    Optional<Part> result = partRepository.getPartOfTeam(teamNo);

    if (result.isEmpty()) {
      // 참여목록이 없는 경우
      log.info("동네모임 해당 게시물의 참여목록이 존재하지 않습니다!");

      Team team = Team.builder().teamNo(teamNo).build();
      Part tempPart = Part.builder().team(team).build();
      part = partRepository.save(tempPart);

    } else {
      // 참여목록이 있는 경우
      part = result.get();
    }

    return part;
  }

  // 게시물 속 참여목록의 회원 조회
  @Override
  public List<PartUserListDto> getPartUsers(Long teamNo) {

    return partUserRepository.getUserOfPartDtoByNo(teamNo);
  }

  // 참여 삭제 후 목록 속 남은 참여인원 조회
  @Override
  public List<PartUserListDto> remove(Long pino) {

    Long pno = partUserRepository.getPartFromUser(pino); // 참여인원이 속한 참여목록 번호 pno

    partUserRepository.deleteById(pino);

    return partUserRepository.getUsersOfPartDtoByPart(pno); // removeThenList
  }

}
