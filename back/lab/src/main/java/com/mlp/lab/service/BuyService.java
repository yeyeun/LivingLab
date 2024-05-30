package com.mlp.lab.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.entity.Buy;
import com.mlp.lab.repository.BuyRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuyService {
    private final ModelMapper modelMapper;
    private final BuyRepository buyRepository;

    public PageResponseDto<BuyDto> list(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("buyNo").descending());
         
        Page<Buy> result = buyRepository.findAll(pageable);
        List<BuyDto> dtoList = result.getContent().stream()
            .map(buy-> modelMapper.map(buy, BuyDto.class))
            .collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<BuyDto> responseDTO = PageResponseDto.<BuyDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }
}