package com.mlp.lab.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mlp.lab.entity.ShareRoom;
import com.mlp.lab.entity.RoomReply;
import com.mlp.lab.entity.User;

@Repository
public interface RoomReplyRepository extends JpaRepository<RoomReply, Long>{

    List<RoomReply> findByShareRoom(ShareRoom shareRoom);

    List<RoomReply> findByUser(User user);

    @Modifying
    @Query("UPDATE RoomReply r SET r.content = :editedContent WHERE r.replyNo = :replyNo")
    void modify(@Param("replyNo") Long replyNo, @Param("editedContent") String editedContent);
    
}
