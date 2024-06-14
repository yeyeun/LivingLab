package com.mlp.lab.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.chat.ChatRoom;

import java.util.*;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
Optional<ChatRoom> findById(Long id);

}
