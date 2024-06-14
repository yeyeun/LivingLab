package com.mlp.lab.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.User;
import com.mlp.lab.entity.chat.ChatRoom;
import com.mlp.lab.entity.chat.ChatRoomJoin;
import java.util.*;

public interface ChatRoomJoinRepository extends JpaRepository<ChatRoomJoin,
Long> {
List<ChatRoomJoin> findByUser(User user);

List<ChatRoomJoin> findByChatRoom(ChatRoom chatRoom);
}
