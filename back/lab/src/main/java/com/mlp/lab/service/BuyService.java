package com.mlp.lab.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.BuyImage;
import com.mlp.lab.repository.BuyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuyService {
    private final BuyRepository buyRepository;

    public void add(BuyDto buyDto) { // 공동구매 등록(이미지 포함)
        Buy buy = Buy.DtoToEntity(buyDto);
        buyRepository.save(buy);
    }

    public PageResponseDto<BuyDto> list(PageRequestDto pageRequestDto) { // 목록 가져오기(페이징 처리, 이미지 포함)
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("buyNo").descending());

        Page<Object[]> result = buyRepository.selectList(pageable);
        List<BuyDto> dtoList = result.get().map(arr -> {
            Buy buy = (Buy) arr[0];
            BuyImage buyImage = (BuyImage) arr[1];

            BuyDto buyDto = BuyDto.builder()
                    .buyNo(buy.getBuyNo()).title(buy.getTitle()).buyCategory(buy.getBuyCategory())
                    .location(buy.getLocation()).max(buy.getMax()).current(buy.getCurrent())
                    .deadline(buy.getDeadline()).nickname(buy.getNickname()).build();

            String imageStr = buyImage.getFileName();
            buyDto.setUploadFileNames(List.of(imageStr));
            return buyDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<BuyDto> responseDto = PageResponseDto.<BuyDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDto;
    }

    public BuyDto read(int buyNo) {
        Optional<Buy> result = buyRepository.findById(buyNo);
        Buy buy = result.orElseThrow();
        BuyDto buyDto = buy.entityToDto(buy);
        return buyDto;
    }

}