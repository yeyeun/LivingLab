package com.mlp.lab.repository.like;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mlp.lab.entity.like.LikeShareRoom;

@Repository
public interface LikeRoomRepository extends JpaRepository<LikeShareRoom, Long>{
    @Query("select ls from LikeShareRoom ls where ls.shareRoom.roomNo=:roomNo and ls.user.id=:id")
    Optional<LikeShareRoom> findLike(@Param("roomNo")Long roomNo, @Param("id") Long id);
}
