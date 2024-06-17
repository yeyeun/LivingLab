package com.mlp.lab.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlp.lab.dto.like.LikeBuyDto;
import com.mlp.lab.entity.like.LikeBuy;
import com.mlp.lab.repository.like.LikeBuyRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
    private final ModelMapper modelMapper;
    private final LikeBuyRepository likeBuyRepository;

    public void addBuy(LikeBuyDto likeBuyDto){
        LikeBuy likeBuy = modelMapper.map(likeBuyDto, LikeBuy.class);
        likeBuyRepository.save(likeBuy);
    }

    public void deleteBuy(long likeNo) {
        likeBuyRepository.deleteById(likeNo);
    }

}
