package com.mlp.lab.repository.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.entity.chat.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c " +
            "JOIN ChatRoom cr on c.chatRoom.chatroomId = cr.chatroomId " +
            "WHERE cr.chatroomId = :roomId " +
            "ORDER BY c.chatId")
    List<Chat> getChatByRoomId(@Param("roomId") Long roomId);
}

