package com.mlp.lab.repository.part;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.dto.PartUserListDto;
import com.mlp.lab.entity.part.BuyPartUser;

//BuyPartUser Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface BuyPartUserRepository extends JpaRepository<BuyPartUser, Long> {

  // 공동구매 한 게시물의 모든 참가목록 회원들을 가져올 경우 (회원 순으로 오름차순 출력)
  @Query("select new com.mlp.lab.dto.PartUserListDto(pu.pino, pu.user.nickname, pu.user.email, pu.user.profileImage) from BuyPartUser pu inner join BuyPart bp on pu.buypart = bp left join User u on pu.user = u where bp.buy.buyNo = :buyNo order by pu.pino asc")
  List<PartUserListDto> getUserOfBuyPartDtoByNo(@Param("buyNo") Long buyNo);

  // 공동구매 게시물의 번호, 사용자의 번호로 해당 사용자가 참여회원으로 존재하는지 확인
  @Query("select pu from BuyPartUser pu left join BuyPart p on pu.buypart = p where p.buy.buyNo = :buyNo and pu.user.id = :id")
  BuyPartUser getBuyUserOfPno(@Param("buyNo") Long buyNo, @Param("id") Long id);

  /////////////////////////////////////////////////////////////////////////////////////////////
  // 참여목록 회원 번호로 참여목록 번호를 얻어오려고 하는 경우
  @Query("select p.pno from BuyPart p left join BuyPartUser pu on pu.buypart = p where pu.pino = :pino")
  Long getPartFromUser(@Param("pino") Long pino);

  // 참여목록 번호로 모든 참여회원들을 조회 (오름차순 정렬)
  @Query("select u, pu from BuyPartUser pu inner join BuyPart p on pu.buypart = p left join User u on pu.user = u where p.pno = :pno order by pu.pino asc")
  List<PartUserListDto> getUsersOfPartDtoByPart(@Param("pno") Long pno);

  // (참여목록에서 특정회원이 빠질 경우, 나머지 회원 정보는 나와야됨)

}
