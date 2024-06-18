package com.mlp.lab.controller.chat;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.dto.chat.ChatRoomDataRequestDto;
import com.mlp.lab.dto.chat.ChatRoomDataResponseDto;
import com.mlp.lab.service.chat.ChatRoomService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }

    @GetMapping("/room/test")
    public String roomsTest(Model model) {
        return "/chat/room_test";
    }

    // 모든 채팅방 목록 반환(해당 유저의)
    @GetMapping("/rooms")
    @ResponseBody
    public ResponseDto<List<ChatRoomDataResponseDto.Info>> room(@RequestParam(name="userId") Long userId) {
        List<ChatRoomDataResponseDto.Info> roomsData = chatRoomService.findAllRoomByUserId(userId);
        return ResponseDto.setSuccessData(userId+"번 유저의 모든 채팅방 목록 반환", roomsData);
    }

    // 채팅방 생성
    @PostMapping("/room/create")
    @ResponseBody
    public ResponseDto<ChatRoomDataResponseDto.Info> createRoom(@RequestParam(name="userId") Long userId,
            @RequestBody ChatRoomDataRequestDto.create createRequest) {
        ChatRoomDataResponseDto.Info roomData = chatRoomService.createRoom(userId, createRequest);
        return ResponseDto.setSuccessData("채팅방 생성", roomData);
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    // 특정 채팅방 조회
    @GetMapping("/room/read/{roomId}")
    @ResponseBody
    public ResponseDto<ChatRoomDataResponseDto.Info> deleteRoom(@PathVariable("roomId") Long roomId) {
        ChatRoomDataResponseDto.Info roomData = chatRoomService.findRoomByRoomId(roomId);
        return ResponseDto.setSuccessData("특정 채팅방 조회", roomData);
    }

    // 특정 채팅방 삭제
    @DeleteMapping("/room/delete/{roomId}")
    @ResponseBody
    public ResponseDto<Object> roomInfo(@PathVariable("roomId") Long roomId) {
        chatRoomService.deleteRoom(roomId);
        return ResponseDto.setSuccess(roomId + "번 채팅방 삭제");
    }

    // 채팅 기록
    @ResponseBody
    @GetMapping("/room/history/{roomId}")
    public ResponseDto<ChatRoomDataResponseDto.ChatHistory> chatHistory(@PathVariable Long roomId) {
        ChatRoomDataResponseDto.ChatHistory chatHistory = chatRoomService.getChatHistory(roomId);
        return ResponseDto.setSuccessData("채팅 기록", chatHistory);
    }
}