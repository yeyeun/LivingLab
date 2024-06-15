package com.mlp.lab.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.like.LikeBuyDto;
import com.mlp.lab.entity.like.LikeBuy;
import com.mlp.lab.repository.like.LikeBuyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final ModelMapper modelMapper;
    private final LikeBuyRepository likeBuyRepository;

    public void add(LikeBuyDto likeBuyDto){
        LikeBuy likeBuy = modelMapper.map(likeBuyDto, LikeBuy.class);
        System.out.println("likeBuy==========="+likeBuy);
        likeBuyRepository.save(likeBuy);
    }
}