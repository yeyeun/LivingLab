package com.mlp.lab.dto.chat;

import com.mlp.lab.entity.chat.Chat;

import lombok.Getter;
import lombok.Setter;

public class ChatDataResponseDto {

    @Getter
    @Setter
    public static class Message {
        public enum MessageType {
            ENTER, TALK
        }

        private MessageType type;
        private String sender;
        private String message;

        public Message() {
        }

        public Message(Chat chat) {
            this.type = MessageType.TALK;
            this.sender = chat.getSenderNickname();
            this.message = chat.getContent();
        }
    }
}
