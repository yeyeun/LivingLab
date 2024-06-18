package com.mlp.lab.repository.part;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.dto.PartUserListDto;
import com.mlp.lab.entity.part.PartUser;

//PartUser Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface PartUserRepository extends JpaRepository<PartUser, Long> {
  // 특정한 게시물의 모든 참가목록 회원들을 가져올 경우 (회원 순으로 오름차순 출력)
  // input -> teamNo, output -> PartUserListDto
  // tp : team part (모임게시물의 참여목록)
  // @Query("select pu, tp, u from PartUser pu inner join Part tp on pu.part = tp
  // left join User u on pu.user = u where tp.team.teamNo = :teamNo order by
  // pu.pino desc")

  // 동네모임 한 게시물의 모든 참가목록 회원들을 가져올 경우 (회원 순으로 오름차순 출력)
  @Query("select new com.mlp.lab.dto.PartUserListDto(pu.pino, pu.user.nickname, pu.user.email, pu.user.profileImage) from PartUser pu inner join Part tp on pu.part = tp left join User u on pu.user = u where tp.team.teamNo = :teamNo order by pu.pino asc")
  List<PartUserListDto> getUserOfPartDtoByNo(@Param("teamNo") Long teamNo);

  // 동네모임 게시물의 번호, 사용자의 번호로 해당 사용자가 참여회원으로 존재하는지 확인
  @Query("select pu from PartUser pu left join Part p on pu.part = p where p.team.teamNo = :teamNo and pu.user.id = :id")
  PartUser getUserOfPno(@Param("teamNo") Long teamNo, @Param("id") Long id);

  /////////////////////////////////////////////////////////////////////////////////////////////
  // 참여목록 회원 번호로 참여목록 번호를 얻어오려고 하는 경우
  @Query("select p.pno from Part p left join PartUser pu on pu.part = p where pu.pino = :pino")
  Long getPartFromUser(@Param("pino") Long pino);

  // 참여목록 번호로 모든 참여회원들을 조회 (오름차순 정렬)
  @Query("select u, pu from PartUser pu inner join Part p on pu.part = p left join User u on pu.user = u where p.pno = :pno order by pu.pino asc")
  List<PartUserListDto> getUsersOfPartDtoByPart(@Param("pno") Long pno);

  // (참여목록에서 특정회원이 빠질 경우, 나머지 회원 정보는 나와야됨)

}
