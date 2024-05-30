package com.mlp.lab.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.MarketDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.entity.Market;
import com.mlp.lab.repository.MarketRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final ModelMapper modelMapper;
    private final MarketRepository marketRepository;

    public PageResponseDto<MarketDto> list(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("marketNo").descending());
         
        Page<Market> result = marketRepository.findAll(pageable);
        List<MarketDto> dtoList = result.getContent().stream()
            .map(market-> modelMapper.map(market, MarketDto.class))
            .collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<MarketDto> responseDTO = PageResponseDto.<MarketDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }
}