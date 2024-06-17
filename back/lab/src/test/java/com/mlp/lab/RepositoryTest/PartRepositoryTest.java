package com.mlp.lab.RepositoryTest;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import com.mlp.lab.entity.User;
import com.mlp.lab.dto.PartUserListDto;
import com.mlp.lab.entity.Part;
import com.mlp.lab.entity.PartUser;
import com.mlp.lab.entity.Team;
import com.mlp.lab.repository.PartRepository;
import com.mlp.lab.repository.PartUserRepository;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class PartRepositoryTest {

  @Autowired
  private PartRepository partRepository;

  @Autowired
  private PartUserRepository partUserRepository;

  @Transactional
  @Commit
  @Test
  public void testInsertByUser() {
    Long id = (long) 3; // userId 회원번호
    Long teamNo = (long) 1; // 동네모임 게시물 번호

    // 게시물의 참여목록에 참여회원 넣어서 저장
    // 참여 목록에 회원이 1명도 없을 수도 있음

    // 회원 아이디로 참여목록 속 회원 존재 여부 확인, 없으면 추가
    PartUser partUser = partUserRepository.getUserOfPno(teamNo, id);

    // 참여목록에 회원이 없다면 참여목록부터 확인 필요
    // 참여목록 가져와서 해당 게시물에 참여목록 있는지 확인
    Optional<Part> result = partRepository.getPartOfTeam(teamNo);

    Part part = null;

    // 게시물에 참여목록이 없는 경우, 참여 목록 생성하기
    if (result.isEmpty()) {
      log.info("참여목록이 없습니다!");
      Team team = Team.builder().teamNo(teamNo).build();
      Part tempPart = Part.builder().team(team).build(); // 참여목록을 만들 때 게시물(동네모임)이 필요

      part = partRepository.save(tempPart); // 참여목록 생성
    } else {
      // 참여목록은 있으나 참여목록에 회원이 없는 경우
      part = result.get();

    }

    // if(partUser==null){
    User user = User.builder().id(id).build();
    partUser = PartUser.builder().part(part).user(user).build();
    // }

    partUserRepository.save(partUser); // 참여목록(part)에 참여회원(1번) 추가
  }

  @Test
  public void testListOfTeam() {
    Long teamNo = 1L;

    List<PartUserListDto> partUserListDtoList = partUserRepository.getUserOfPartDtoByNo(teamNo);

    for (PartUserListDto dto : partUserListDtoList) {
      log.info(dto);
    }
  }

  @Test
  public void testDeleteThenList() {

    Long pino = 3L;

    Long pno = partUserRepository.getPartFromUser(pino);

    partUserRepository.deleteById(pino);

    List<PartUserListDto> partUserList = partUserRepository.getUserOfPartDtoByNo(pno);

    for (PartUserListDto dto : partUserList) {
      log.info(dto);
    }
  }

}
