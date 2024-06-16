package com.mlp.lab.repository.chat;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.entity.chat.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

        @Query("SELECT cr FROM ChatRoom cr " +
                        "WHERE cr.writer.id = :id OR cr.reader.id = :id")
        List<ChatRoom> findByUserId(@Param("id") Long id);

        ChatRoom findByChatroomId(Long roomId);

        @Query("SELECT cr FROM ChatRoom cr " +
                        "WHERE (cr.writer.id = :id OR cr.reader.id = :id) AND cr.buy.buyNo = :buyNo")
        Optional<ChatRoom> findByUserIdAndBuyNo(@Param("id") Long id, @Param("buyNo") Long buyNo);

        

}
