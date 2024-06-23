package com.mlp.lab.dto.chat;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.mlp.lab.entity.User;
import com.mlp.lab.entity.chat.Chat;
import com.mlp.lab.entity.chat.ChatRoom;

import lombok.Getter;
import lombok.Setter;

public class ChatRoomDataResponseDto {
    @Getter
    @Setter
    public static class Info {
        private Long roomId;
        private Long BuyNo;
        private Long writerId;
        private List<Long> readerId;

        private Info(Long roomId, Long BuyNo, Long writerId, List<Long> readerId) {
            this.roomId = roomId;
            this.BuyNo = BuyNo;
            this.writerId = writerId;
            this.readerId = readerId;
        }

        public static Info of(ChatRoom chatRoom) {
            List<Long> readerId = new ArrayList<>();

            // chatRoom.getReader()가 List<User> 타입인 경우에 대비하여 처리
            if (chatRoom.getReader() != null && !chatRoom.getReader().isEmpty()) {
                readerId = chatRoom.getReader().stream()
                        .map(User::getId)
                        .collect(Collectors.toList());
            }

            return new Info(chatRoom.getChatroomId(),
                    chatRoom.getBuy().getBuyNo(),
                    chatRoom.getWriter().getId(),
                    readerId);
        }
    }

    @Getter
    @Setter
    public static class ChatHistory {
        List<ChatDataResponseDto.Message> messageHistory = new ArrayList<>();
        public ChatHistory(List<Chat> messageHistory) {
            this.messageHistory = messageHistory.stream()
                    .map(chat -> new ChatDataResponseDto.Message(chat))
                    .collect(Collectors.toList());
        }
    }
}
