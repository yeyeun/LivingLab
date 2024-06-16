package com.mlp.lab.controller.chat;

import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.mlp.lab.dto.chat.ChatDataRequestDto;
import com.mlp.lab.service.chat.ChatService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/message")
    public void sendMessage(@RequestBody ChatDataRequestDto.Message message,
            @RequestParam Long userId) {
        System.out.println("받은 메시지: " + message.getMessage());
        System.out.println("메시지 유형: " + message.getType());
        System.out.println("채팅방 ID: " + message.getRoomId());
        chatService.sendMessage(userId, message);
    }
}
