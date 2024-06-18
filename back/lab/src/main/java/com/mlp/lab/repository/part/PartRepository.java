package com.mlp.lab.repository.part;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.entity.part.Part;

//Part Entity의 기본키(PK) 타입인 Long을 인자로 전달
public interface PartRepository extends JpaRepository<Part, Long> {

  // 동네모임 게시물에 참여목록이 있는지 확인
  @Query("select part from Part part where part.team.teamNo = :teamNo")
  Optional<Part> getPartOfTeam(@Param("teamNo") Long teamNo);

}
