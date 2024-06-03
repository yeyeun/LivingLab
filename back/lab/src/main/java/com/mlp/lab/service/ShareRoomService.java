package com.mlp.lab.service;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ShareRoomDto;
import com.mlp.lab.entity.ShareRoom;

import com.mlp.lab.repository.ShareRoomRepository;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShareRoomService {
    private final ModelMapper modelMapper;
    private final ShareRoomRepository shareRoomRepository;

    public PageResponseDto<ShareRoomDto> list(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("roomNo").descending());
         
        Page<ShareRoom> result = shareRoomRepository.findAll(pageable);
        List<ShareRoomDto> dtoList = result.getContent().stream()
            .map(market-> modelMapper.map(market, ShareRoomDto.class))
            .collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<ShareRoomDto> responseDTO = PageResponseDto.<ShareRoomDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    public ShareRoomDto get(Integer roomNo){
        Optional<ShareRoom> result = shareRoomRepository.selectOne(roomNo);
        ShareRoom shareRoom = result.orElseThrow();
        ShareRoomDto shareRoomDto = modelMapper.map(shareRoom, ShareRoomDto.class);
        return shareRoomDto;
    }
}