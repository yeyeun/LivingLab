package com.mlp.lab.service.part;

import org.springframework.stereotype.Service;

import com.mlp.lab.dto.PartUserDto;
import com.mlp.lab.dto.PartUserListDto;
import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.Team;
import com.mlp.lab.entity.User;
import com.mlp.lab.entity.part.BuyPart;
import com.mlp.lab.entity.part.BuyPartUser;
import com.mlp.lab.entity.part.Part;
import com.mlp.lab.entity.part.PartUser;
import com.mlp.lab.repository.part.BuyPartRepository;
import com.mlp.lab.repository.part.BuyPartUserRepository;
import com.mlp.lab.repository.part.PartRepository;
import com.mlp.lab.repository.part.PartUserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class PartServiceImpl implements PartService {

  private final PartRepository partRepository;
  private final BuyPartRepository buypartRepository;

  private final BuyPartUserRepository buyPartUserRepository;
  private final PartUserRepository partUserRepository;

  // 공동구매 참여목록에 참여하기
  @Override
  public List<PartUserListDto> addBuy(PartUserDto partUserDto, Long buyNo) {

    String email = partUserDto.getEmail();
    String nickname = partUserDto.getNickname();
    String profileImage = partUserDto.getProfileImage();
    Long id = partUserDto.getId(); // userId
    // Long pno = partUserDto.getPno();
    Long pino = partUserDto.getPino();

    // 공동구매 참여목록에 이미 회원이 등록된 경우 (장바구니 아이템 번호가 있어서 수량변경만 하는 경우)
    if (pino != null) {
      log.info(nickname + "님은 이미 참가 등록된 회원입니다!");
      return getBuyPartUsers(buyNo);
    }

    // 공동구매 참여목록에 회원이 없는 경우
    // 게시물의 참여목록
    BuyPart buypart = getBuyPart(buyNo);

    BuyPartUser partUser = null;

    partUser = buyPartUserRepository.getBuyUserOfPno(buyNo, id);

    if (partUser == null) {
      // 참여목록에 회원이 없는 경우
      User user = User.builder().id(id).nickname(nickname).email(email).profileImage(profileImage).build();
      partUser = BuyPartUser.builder().user(user).buypart(buypart).build();
    }
    buyPartUserRepository.save(partUser);

    return getBuyPartUsers(buyNo);
  }

  // 동네모임 참여목록에 참여하기
  @Override
  public List<PartUserListDto> add(PartUserDto partUserDto, Long teamNo) {

    String email = partUserDto.getEmail();
    String nickname = partUserDto.getNickname();
    String profileImage = partUserDto.getProfileImage();
    Long id = partUserDto.getId(); // userId
    // Long pno = partUserDto.getPno();
    Long pino = partUserDto.getPino();
    // Long teamNo = partUserDto.getTeamNo();

    // 동네모임 참여목록에 이미 회원이 등록된 경우 (장바구니 아이템 번호가 있어서 수량변경만 하는 경우)
    if (pino != null) {
      log.info(nickname + "님은 이미 참가 등록된 회원입니다!");
      return getPartUsers(teamNo);
    }

    // 동네모임 참여목록에 회원이 없는 경우
    // 게시물의 참여목록
    Part part = getPart(teamNo);

    PartUser partUser = null;

    partUser = partUserRepository.getUserOfPno(teamNo, id);

    if (partUser == null) {
      // 참여목록에 회원이 없는 경우
      User user = User.builder().id(id).nickname(nickname).email(email).profileImage(profileImage).build();
      partUser = PartUser.builder().user(user).part(part).build();
    }
    partUserRepository.save(partUser);

    return getPartUsers(teamNo);
  }

  private BuyPart getBuyPart(Long buyNo) {
    // 해당 공동구매 게시물(buyNo)의 참여목록(Part)이 있는지 확인, 있으면 반환
    // 없으면 Part 객체 생성하고 추가 반환

    BuyPart buypart = null;

    Optional<BuyPart> result = buypartRepository.getPartOfBuy(buyNo);

    if (result.isEmpty()) {
      // 참여목록이 없는 경우
      log.info("동네모임 해당 게시물의 참여목록이 존재하지 않습니다!");

      Buy buy = Buy.builder().buyNo(buyNo).build();
      BuyPart tempPart = BuyPart.builder().buy(buy).build();
      buypart = buypartRepository.save(tempPart);

    } else {
      // 참여목록이 있는 경우
      buypart = result.get();
    }

    return buypart;
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

  // 공동구매 게시물 속 참여목록의 회원 조회
  @Override
  public List<PartUserListDto> getBuyPartUsers(Long buyNo) {

    return buyPartUserRepository.getUserOfBuyPartDtoByNo(buyNo);
  }

  // 동네모임 게시물 속 참여목록의 회원 조회
  @Override
  public List<PartUserListDto> getPartUsers(Long teamNo) {

    return partUserRepository.getUserOfPartDtoByNo(teamNo);
  }

  // 공동구매 참여 삭제 후 목록 속 남은 참여인원 조회
  @Override
  public List<PartUserListDto> removeBuy(Long pino) {

    Long pno = buyPartUserRepository.getPartFromUser(pino); // 참여인원이 속한 참여목록 번호 pno

    buyPartUserRepository.deleteById(pino);

    return buyPartUserRepository.getUsersOfPartDtoByPart(pno); // removeThenList
  }

  // 동네모임 참여 삭제 후 목록 속 남은 참여인원 조회
  @Override
  public List<PartUserListDto> remove(Long pino) {

    Long pno = partUserRepository.getPartFromUser(pino); // 참여인원이 속한 참여목록 번호 pno

    partUserRepository.deleteById(pino);

    return partUserRepository.getUsersOfPartDtoByPart(pno); // removeThenList
  }

}
