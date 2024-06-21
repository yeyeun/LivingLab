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
import com.mlp.lab.dto.like.LikeMarketDto;
import com.mlp.lab.dto.like.LikeRoomDto;
import com.mlp.lab.service.LikeService;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    /* ===============공동구매=============== */ 

    @PostMapping("/buy") // 좋아요 +1
    public void likeBuy(@RequestBody LikeBuyDto likeBuyDto){
       likeService.addBuy(likeBuyDto);
    }
    
    @DeleteMapping("/buy/{likeNo}") // 좋아요 -1
    public void unlikeBuy(@PathVariable(name = "likeNo") long likeNo){
        likeService.deleteBuy(likeNo);
    }

    @GetMapping("/buy") //좋아요 정보 조회
    public LikeBuyDto likeInfoBuy(@RequestParam(value="buyNo") Long buyNo, @RequestParam(value="id") Long id){
        return likeService.readBuy(buyNo,id);
   }

     /* ===============동네장터=============== */ 

    @PostMapping("/market") // 좋아요 +1
    public void likeMarket(@RequestBody LikeMarketDto likeMarketDto){
       likeService.addMarket(likeMarketDto);
    }
       
    @DeleteMapping("/market/{likeNo}") // 좋아요 -1
    public void unlikeMarket(@PathVariable(name = "likeNo") long likeNo){
        likeService.deleteMarket(likeNo);
    }
   
    @GetMapping("/market") //좋아요 정보 조회
    public LikeMarketDto likeInfoMarket(@RequestParam(value="marketNo") Long marketNo, @RequestParam(value="id") Long id){
         return likeService.readMarket(marketNo,id);
    }


   /* ===============자취방쉐어=============== */ 

   @PostMapping("/shareRoom") // 좋아요 +1
   public void likeRoom(@RequestBody LikeRoomDto likeRoomDto){
      likeService.addRoom(likeRoomDto);
   }
   
   @DeleteMapping("/shareRoom/{likeNo}") // 좋아요 -1
   public void unlikeRoom(@PathVariable(name = "likeNo") long likeNo){
       likeService.deleteRoom(likeNo);
   }

   @GetMapping("/shareRoom") //좋아요 정보 조회
   public LikeRoomDto likeInfoRoom(@RequestParam(value="roomNo") Long roomNo, @RequestParam(value="id") Long id){
       return likeService.readRoom(roomNo,id);
  }

}
