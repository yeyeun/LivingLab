package com.mlp.lab.repository.like;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mlp.lab.entity.like.LikeTeam;

@Repository
public interface LikeTeamRepository extends JpaRepository<LikeTeam, Long>{
    @Query("select lt from LikeTeam lt where lt.team.teamNo=:teamNo and lt.user.id=:id")
    Optional<LikeTeam> findLike(@Param("teamNo")Long teamNo, @Param("id") Long id);
}
