package com.mlp.lab.dto.chat;

import lombok.Getter;
import lombok.Setter;

public class ChatDataRequestDto {

    @Getter
    @Setter
    public static class Message {
        // 사용자가 채팅방에 입장할 때는 ENTER, 일반 메시지일 때는 TALK
        public enum MessageType {
            ENTER, TALK
        }

        private MessageType type;
        private Long roomId;
        private String message;
    }
}
