package com.mlp.lab.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlp.lab.dto.like.LikeBuyDto;
import com.mlp.lab.dto.like.LikeMarketDto;
import com.mlp.lab.dto.like.LikeRoomDto;
import com.mlp.lab.entity.like.LikeBuy;
import com.mlp.lab.entity.like.LikeMarket;
import com.mlp.lab.entity.like.LikeShareRoom;
import com.mlp.lab.repository.like.LikeBuyRepository;
import com.mlp.lab.repository.like.LikeMarketRepository;
import com.mlp.lab.repository.like.LikeRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final ModelMapper modelMapper;
    private final LikeBuyRepository likeBuyRepository;
    private final LikeMarketRepository likeMarketRepository;
    private final LikeRoomRepository likeRoomRepository;

    /* ===============공동구매=============== */ 

    public void addBuy(LikeBuyDto likeBuyDto){
        LikeBuy likeBuy = modelMapper.map(likeBuyDto, LikeBuy.class);
        likeBuyRepository.save(likeBuy);
    }

    public void deleteBuy(long likeNo) {
        likeBuyRepository.deleteById(likeNo);
    }

    public LikeBuyDto readBuy(Long buyNo, Long id) {
        Optional<LikeBuy> result = likeBuyRepository.findLike(buyNo,id);
        LikeBuy likeBuy = result.orElse(null);
        if(likeBuy == null){
            return null;
        }
        LikeBuyDto likeBuyDto = modelMapper.map(likeBuy, LikeBuyDto.class);
        return likeBuyDto;
    }

    /* ===============동네장터=============== */ 

    public void addMarket(LikeMarketDto likeMarketDto){
        LikeMarket likeMarket = modelMapper.map(likeMarketDto, LikeMarket.class);
        likeMarketRepository.save(likeMarket);
    }

    public void deleteMarket(long likeNo) {
        likeMarketRepository.deleteById(likeNo);
    }

    public LikeMarketDto readMarket(Long marketNo, Long id) {
        Optional<LikeMarket> result = likeMarketRepository.findLike(marketNo,id);
        LikeMarket likeMarket = result.orElse(null);
        if(likeMarket == null){
            return null;
        }
        LikeMarketDto likeMarketDto = modelMapper.map(likeMarket, LikeMarketDto.class);
        return likeMarketDto;
    }

    /* ===============자취방쉐어=============== */ 

    public void addRoom(LikeRoomDto likeRoomDto){
        LikeShareRoom likeShareRoom = modelMapper.map(likeRoomDto, LikeShareRoom.class);
        likeRoomRepository.save(likeShareRoom);
    }

    public void deleteRoom(long likeNo) {
        likeRoomRepository.deleteById(likeNo);
    }

    public LikeRoomDto readRoom(Long roomNo, Long id) {
        Optional<LikeShareRoom> result = likeRoomRepository.findLike(roomNo,id);
        LikeShareRoom likeShareRoom = result.orElse(null);
        if(likeShareRoom == null){
            return null;
        }
        LikeRoomDto likeRoomDto = modelMapper.map(likeShareRoom, LikeRoomDto.class);
        return likeRoomDto;
    }

}
