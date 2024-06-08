package com.mlp.lab.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.mlp.lab.entity.MarketImage;
import com.mlp.lab.repository.MarketRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final MarketRepository marketRepository;

    public PageResponseDto<MarketDto> list(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("marketNo").descending());
        
        Page<Object[]> result = marketRepository.selectList(pageable);
        List<MarketDto> dtoList = result.get().map(arr -> {
            Market market = (Market) arr[0];
            MarketImage marketImage = (MarketImage) arr[1];
            
            MarketDto marketDto = MarketDto.builder()
                    .marketNo(market.getMarketNo()).title(market.getTitle()).marketCategory(market.getMarketCategory())
                    .location(market.getLocation()).max(market.getMax()).current(market.getCurrent())
                    .deadline(market.getDeadline()).nickname(market.getNickname()).build();

            String imageStr = marketImage.getFileName();
            marketDto.setUploadFileNames(List.of(imageStr));
            return marketDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<MarketDto> responseDTO = PageResponseDto.<MarketDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    public PageResponseDto<MarketDto> searchList(PageRequestDto pageRequestDto, String search){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("marketNo").descending());
        
        Page<Object[]> result = marketRepository.selectSearchList(search, pageable);
        List<MarketDto> dtoList = result.get().map(arr -> {
            Market market = (Market) arr[0];
            MarketImage marketImage = (MarketImage) arr[1];
            
            MarketDto marketDto = MarketDto.builder()
                    .marketNo(market.getMarketNo()).title(market.getTitle()).marketCategory(market.getMarketCategory())
                    .location(market.getLocation()).max(market.getMax()).current(market.getCurrent())
                    .deadline(market.getDeadline()).nickname(market.getNickname()).build();

            String imageStr = marketImage.getFileName();
            marketDto.setUploadFileNames(List.of(imageStr));
            return marketDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<MarketDto> responseDTO = PageResponseDto.<MarketDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

     public void add(MarketDto marketDto) { // 동네장터 등록(이미지 포함)
        Market market = Market.DtoToEntity(marketDto);
        marketRepository.save(market);
    }

    public MarketDto read(int marketNo) { // 동네장터 조회
        Optional<Market> result = marketRepository.findById(marketNo);
        Market market = result.orElseThrow();
        MarketDto marketDto = market.entityToDto(market);
        return marketDto;
    }

    public void modify(MarketDto marketDto) { //수정하기
        // 조회
        Optional<Market> result = marketRepository.findById(marketDto.getMarketNo().intValue());
        Market market = result.orElseThrow();

        // 수정
        market.setTitle(marketDto.getTitle());
        market.setContent(marketDto.getContent());
        market.setLocation(marketDto.getLocation());
        market.setMarketCategory(marketDto.getMarketCategory());
        market.setDeadline(marketDto.getDeadline());

        // 파일들 삭제
        market.clearList();
        List<String> uploadFileNames = marketDto.getUploadFileNames();
        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                market.addImageString(uploadName);
            });
        }
        marketRepository.save(market);
    }
}