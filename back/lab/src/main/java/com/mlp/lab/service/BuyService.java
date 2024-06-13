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

    // 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<BuyDto> list(PageRequestDto pageRequestDto, String search, String sort) {
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("buyNo").descending());
        Page<Object[]> result = null;
        if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 페이지 클릭 시
            result = buyRepository.selectList(pageable);
        } else if (search != null && !search.isEmpty()) { // 검색
            result = buyRepository.selectSearchList(search, pageable);
        } else if (sort != null && !sort.isEmpty()) { // 정렬
            if(sort.equals("최신순")){
                result = buyRepository.newList(pageable);
            }
            if(sort.equals("마감임박순")){
                result = buyRepository.deadLineList(pageable);
            }
            // if(sort.equals("거리순")){
            //     result = 
            // }
            // if(sort.equals("좋아요순")){
            //     result = 
            // }
        } else if (search != null && sort != null) { // 검색&정렬 둘다
            if(sort.equals("최신순")){
                result = buyRepository.searchNewList(sort, pageable);
            }
            if(sort.equals("마감임박순")){
                result = buyRepository.searchDeadLineList(sort, pageable);
            }
            // if(sort.equals("거리순")){
            //     result = 
            // }
            // if(sort.equals("좋아요순")){
            //     result = 
            // }
        }
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

    // 공동구매 등록(이미지 포함)
    public void add(BuyDto buyDto) {
        Buy buy = Buy.DtoToEntity(buyDto);
        buyRepository.save(buy);
    }

    // 공동구매 조회
    public BuyDto read(int buyNo) {
        Optional<Buy> result = buyRepository.findById(buyNo);
        Buy buy = result.orElseThrow();
        BuyDto buyDto = Buy.entityToDto(buy);
        return buyDto;
    }
    
    //삭제하기
    public void remove(int buyNo) {
        buyRepository.deleteById(buyNo);
    }

    // 수정하기(이미지 포함)
    public void modify(BuyDto buyDto) {
        // 조회
        Optional<Buy> result = buyRepository.findById(buyDto.getBuyNo().intValue());
        Buy buy = result.orElseThrow();

        // 수정
        buy.setTitle(buyDto.getTitle());
        buy.setContent(buyDto.getContent());
        buy.setLocation(buyDto.getLocation());
        buy.setBuyCategory(buyDto.getBuyCategory());
        buy.setDeadline(buyDto.getDeadline());

        // 파일들 삭제
        buy.clearList();
        List<String> uploadFileNames = buyDto.getUploadFileNames();
        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                buy.addImageString(uploadName);
            });
        }
        buyRepository.save(buy);
    }
}