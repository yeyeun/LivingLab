// package com.mlp.lab.service.chat;

// import java.time.LocalDateTime;

// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.mlp.lab.entity.chat.ChatMessage;
// import com.mlp.lab.dto.chat.ChatMessageForm;
// import com.mlp.lab.repository.chat.ChatMessageRepository;
// import com.mlp.lab.service.UserService;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class ChatMessageService {
// private final ChatMessageRepository chatMessageRepository;
// private final UserService userService;
// private final ChatRoomService chatRoomService;

// @Transactional
// public void save(ChatMessageForm message) {
// ChatMessage chatMessage = new ChatMessage(message.getMessage(),
// LocalDateTime.now(),
// chatRoomService.findById(message.getChatRoomId()).get(),
// userService.findByEmail(message.getSender()));
// chatMessageRepository.save(chatMessage);
// }
// }
