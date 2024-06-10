package com.mlp.lab.repository;

import java.util.*;

import org.springframework.stereotype.Repository;

import com.mlp.lab.dto.Chat.ChatRoomDTO;

import jakarta.annotation.PostConstruct;

@Repository
public class ChatRoomRepository {

  private Map<String, ChatRoomDTO> chatRoomDTOMap;

  @PostConstruct
  private void init() {
    chatRoomDTOMap = new LinkedHashMap<>();
  }

  public List<ChatRoomDTO> findAllRooms() {
    // 채팅방 생성 순서 최근 순으로 반환
    List<ChatRoomDTO> result = new ArrayList<>(chatRoomDTOMap.values());
    Collections.reverse(result);

    return result;
  }

  public ChatRoomDTO findRoomById(String id) {
    return chatRoomDTOMap.get(id);
  }

  public ChatRoomDTO createChatRoomDTO(String name) {
    ChatRoomDTO room = ChatRoomDTO.create(name);
    chatRoomDTOMap.put(room.getRoomId(), room);

    return room;
  }
}