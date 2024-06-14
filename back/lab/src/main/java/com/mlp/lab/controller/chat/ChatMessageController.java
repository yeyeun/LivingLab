package com.mlp.lab.controller.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.mlp.lab.dto.chat.ChatMessageForm;
import com.mlp.lab.service.chat.ChatMessageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequiredArgsConstructor
@Log4j2
public class ChatMessageController {
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final ChatMessageService chatMessageService;

  @MessageMapping("/chat/send")
  public void sendMsg(ChatMessageForm message) {
    String receiver = message.getReceiver();
    log.info("Received message: {}", message.getMessage());
    chatMessageService.save(message);
    simpMessagingTemplate.convertAndSend("/topic/" + receiver, message);
  }

}

// /app의 경우 기본 publish로 지정했기 때문에 
///app 이후 url만 MessageMapping으로 요청받고 
//각자 입맛에 맞게 변형한 뒤 SimplMessagingTemplate를 통해서 
//내가 보내주고자 하는 사람이 subscribe한 링크로 보내주면 됩니다. 
//이런식으로 client가 채팅방을 만들 때 publish는 모두 동일한 링크로 두고 
//subscribe를 개인의 고유한 url로 만들어서 
//각각의 유저끼리 1:1 채팅이 가능하도록 합니다.