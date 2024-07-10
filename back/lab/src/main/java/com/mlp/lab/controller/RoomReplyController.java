package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.mlp.lab.dto.RoomReplyDto;
import com.mlp.lab.service.ReplyService;
import com.mlp.lab.service.RoomReplyService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/reply/room")
@RequiredArgsConstructor
public class RoomReplyController {
    private final RoomReplyService roomReplyService;

    @PostMapping("/add")
    public void addReply(@RequestBody RoomReplyDto roomReplyDto) {
        roomReplyService.addReply(roomReplyDto);
    }

    @DeleteMapping("/{replyNo}")
    public void deleteReply(@PathVariable(name = "replyNo") Long replyNo) {
        roomReplyService.deleteReply(replyNo);
    }

    @GetMapping("/{roomNo}")
    public List<RoomReplyDto> getList(@PathVariable(name = "roomNo") Long roomNo) {
        return roomReplyService.list(roomNo);
    }
    
    @PutMapping("/{replyNo}")
    public void modifyReply(@PathVariable(name = "replyNo") Long replyNo, @RequestBody RoomReplyDto roomReplyDto) {
        roomReplyService.modify(replyNo, roomReplyDto);
    }

    @GetMapping("/mylist/{id}")
    public List<RoomReplyDto> myList(@PathVariable(name = "id") Long id) {
        return roomReplyService.mylist(id);
    }
}
