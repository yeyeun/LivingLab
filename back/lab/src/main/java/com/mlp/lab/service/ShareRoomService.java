package com.mlp.lab.service;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.RoomPageRequestDto;
import com.mlp.lab.dto.RoomPageResponseDto;
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

    public RoomPageResponseDto<ShareRoomDto> list(RoomPageRequestDto roomPageRequestDto){
        Pageable pageable = PageRequest.of(
            roomPageRequestDto.getPage()-1,
            roomPageRequestDto.getSize(),
            Sort.by("roomNo").descending());
         
        Page<ShareRoom> result = shareRoomRepository.findAll(pageable);
        List<ShareRoomDto> dtoList = result.getContent().stream()
            .map(market-> modelMapper.map(market, ShareRoomDto.class))
            .collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        RoomPageResponseDto<ShareRoomDto> responseDTO = RoomPageResponseDto.<ShareRoomDto>withAll()
            .dtoList(dtoList)
            .roomPageRequestDto(roomPageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    public ShareRoomDto get(Integer roomNo){
        Optional<ShareRoom> result = shareRoomRepository.findById(roomNo);
        ShareRoom shareRoom = result.orElseThrow();
        ShareRoomDto shareRoomDto = modelMapper.map(shareRoom, ShareRoomDto.class);
        return shareRoomDto;
    }
}