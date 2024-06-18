package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.mlp.lab.dto.like.LikeBuyDto;
import com.mlp.lab.service.LikeService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/buy") // 좋아요 +1
    public void likeBuy(@RequestBody LikeBuyDto likeBuyDto){
       likeService.addBuy(likeBuyDto);
    }
    
    @DeleteMapping("/buy/{likeNo}") // 좋아요 -1
    public void unlikeBuy(@PathVariable(name = "likeNo") long likeNo){
        likeService.deleteBuy(likeNo);
    }

    @GetMapping("/buy") //좋아요 정보 조회
    public LikeBuyDto likeInfo(@RequestParam(value="buyNo") Long buyNo, @RequestParam(value="id") Long id){
        return likeService.read(buyNo,id);
   }

}
