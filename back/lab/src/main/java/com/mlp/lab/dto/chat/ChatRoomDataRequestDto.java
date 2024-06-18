package com.mlp.lab.dto.chat;

import lombok.Getter;
import lombok.Setter;

public class ChatRoomDataRequestDto {
    @Getter
    @Setter
    public static class create {
        private Long buyNo;
    }
}
