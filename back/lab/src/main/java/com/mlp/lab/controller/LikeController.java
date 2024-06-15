package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.mlp.lab.dto.like.LikeBuyDto;
import com.mlp.lab.service.LikeService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/buy")
    public void likePost(@RequestBody LikeBuyDto likeBuyDto){
       likeService.add(likeBuyDto);
    }
    
    
}
