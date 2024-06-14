package com.mlp.lab.dto.chat;

import java.util.List;

import com.mlp.lab.entity.chat.ChatMessage;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDetailDto {
private Long senderId;
private String senderName;
private String senderEmail;
private String receiverName;
private List<ChatMessage> messages;
private Long chatRoomId;

}
