package com.mlp.lab.controller.Chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.mlp.lab.repository.ChatRoomRepository;

@CrossOrigin(origins = "*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat")
@Log4j2
public class RoomController {

  private final ChatRoomRepository repository;

  // 채팅방 목록 조회
  @GetMapping("/rooms")
  public ModelAndView rooms() {

    log.info("# All Chat Rooms");
    ModelAndView mv = new ModelAndView("chat/rooms");

    mv.addObject("list", repository.findAllRooms());

    return mv;
  }

  // 채팅방 개설
  @PostMapping("/room")
  public String create(@RequestParam String name, RedirectAttributes rttr) {

    log.info("# Create Chat Room , name: " + name);
    rttr.addFlashAttribute("roomName", repository.createChatRoomDTO(name));
    return "redirect:/chat/rooms";
  }

  // 채팅방 조회
  @GetMapping("/room")
  public void getRoom(String roomId, Model model) {

    log.info("# get Chat Room, roomID : " + roomId);

    model.addAttribute("room", repository.findRoomById(roomId));
  }
}