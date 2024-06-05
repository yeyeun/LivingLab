package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.ShareRoomDto;
import com.mlp.lab.dto.RoomPageRequestDto;
import com.mlp.lab.dto.RoomPageResponseDto;
import com.mlp.lab.service.ShareRoomService;
import lombok.RequiredArgsConstructor;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/shareRoom")
@RequiredArgsConstructor
public class ShareRoomController {
    private final ShareRoomService shareRoomService;

    @GetMapping("/list")
    public RoomPageResponseDto<ShareRoomDto> List(RoomPageRequestDto roomPageRequestDto){
        return shareRoomService.list(roomPageRequestDto);
    }

    @GetMapping("/read/{roomNo}")
    public ShareRoomDto read(@PathVariable(name="roomNo") Integer roomNo){
        return shareRoomService.get(roomNo);
    }
    
}