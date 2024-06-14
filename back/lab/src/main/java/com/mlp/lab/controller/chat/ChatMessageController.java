// package com.mlp.lab.controller.chat;

// import org.springframework.messaging.handler.annotation.MessageMapping;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.stereotype.Controller;

// import com.mlp.lab.dto.chat.ChatMessageForm;
// import com.mlp.lab.service.chat.ChatMessageService;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.log4j.Log4j2;

// @Controller
// @RequiredArgsConstructor
// @Log4j2
// public class ChatMessageController {
// private final SimpMessagingTemplate simpMessagingTemplate;
// private final ChatMessageService chatMessageService;

// @MessageMapping("/chat/send")
// public void sendMsg(ChatMessageForm message) {
// String receiver = message.getReceiver();
// log.info("Received message: {}", message.getMessage());
// chatMessageService.save(message);
// simpMessagingTemplate.convertAndSend("/topic/" + receiver, message);
// }

// }
