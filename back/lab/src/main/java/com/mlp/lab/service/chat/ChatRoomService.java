package com.mlp.lab.service.chat;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mlp.lab.dto.chat.ChatRoomDataRequestDto;
import com.mlp.lab.dto.chat.ChatRoomDataResponseDto;
import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.User;
import com.mlp.lab.entity.chat.Chat;
import com.mlp.lab.entity.chat.ChatRoom;
import com.mlp.lab.repository.BuyRepository;
import com.mlp.lab.repository.UserRepository;
import com.mlp.lab.repository.chat.ChatRepository;
import com.mlp.lab.repository.chat.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final BuyRepository buyRepository;

    public List<ChatRoomDataResponseDto.Info> findAllRoomByUserId(Long userId) {
        List<ChatRoom> ChatRooms = chatRoomRepository.findByUserId(userId);
        return ChatRooms.stream()
                .map(chatRoom -> ChatRoomDataResponseDto.Info.of(chatRoom))
                .collect(Collectors.toList());
    }

    public ChatRoomDataResponseDto.Info findRoomByRoomId(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByChatroomId(roomId);
        return ChatRoomDataResponseDto.Info.of(chatRoom);
    }

    public ChatRoomDataResponseDto.Info createRoom(Long userId, ChatRoomDataRequestDto.create createRequest) {
        Buy buy = buyRepository.findByBuyNo(createRequest.getBuyNo());
        User user = buy.getUser();    //글 작성자(채팅방 생성 후 자동으로 입장)

        // if (chatRoomRepository.findByUserIdAndBuyNo(UserId,
        // createRequest.getBuyNo()).isPresent()) {
        // throw new Exception("이미 채팅방이 생성");
        // }

        // TODO : 이미 채팅방이 생성되 있을 수도 있음
        ChatRoom chatRoom = ChatRoom.builder()
                .writer(user)
                .buy(buy)
                .build();

        chatRoomRepository.save(chatRoom);

        return ChatRoomDataResponseDto.Info.of(chatRoom);
    }

    public void enterRoom(Long userId, Long buyNo){
        User user = userRepository.findByUserId(userId);  //글을 읽고 참여하기를 누른 유저
        ChatRoom chatRoom = chatRoomRepository.findByBuy_BuyNo(buyNo);
        List<User> readers = chatRoom.getReader();
        readers.add(user);
        chatRoomRepository.save(chatRoom);
    }

    public void deleteRoom(Long roomId) {
        chatRoomRepository.deleteById(roomId);
    }

    public ChatRoomDataResponseDto.ChatHistory getChatHistory(Long roomId) {
        List<Chat> chatHistory = chatRepository.getChatByRoomId(roomId);
        return new ChatRoomDataResponseDto.ChatHistory(chatHistory);
    }

}
