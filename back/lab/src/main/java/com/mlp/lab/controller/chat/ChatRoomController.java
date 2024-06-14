package com.mlp.lab.controller.chat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mlp.lab.entity.User;
import com.mlp.lab.entity.chat.ChatRoomJoin;
import com.mlp.lab.dto.chat.ChatRoomDto;
import com.mlp.lab.dto.chat.ChatRoomForm;
import com.mlp.lab.service.UserService;
import com.mlp.lab.service.chat.ChatRoomJoinService;
import com.mlp.lab.service.chat.ChatRoomService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatRoomController {
private final UserService userService;
private final ChatRoomJoinService chatRoomJoinService;
private final ChatRoomService chatRoomService;

@GetMapping("/api/chat")
@ResponseBody
public Object chatHome(@RequestParam("email") String email) {
ChatRoomDto chatRoomDto = new ChatRoomDto();

chatRoomDto.setSenderEmail(email);

User user = userService.findByEmail(email);
List<ChatRoomJoin> chatRoomJoins = chatRoomJoinService.findByUser(user);
List<ChatRoomForm> chatRooms = chatRoomService.setting(chatRoomJoins, user);

chatRoomDto.setChatRooms(chatRooms);

if (user == null) {
chatRoomDto.setSenderName("");
chatRoomDto.setSenderId(0L);
} else {
chatRoomDto.setSenderName(user.getName());
chatRoomDto.setSenderId(user.getId());
}
return chatRoomDto;
}
}
