package com.mlp.lab.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.BuyImage;
import com.mlp.lab.repository.BuyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuyService {
    private final BuyRepository buyRepository;

    @Autowired
    private ModelMapper modelMapper;

    // 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<BuyDto> list(PageRequestDto pageRequestDto, String search, String sort){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("buyNo").descending());
         
            Page<Object[]> result = null;
            if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 페이지 클릭 시
                result = buyRepository.selectList(pageable);
            } else if ((search != null && !search.isEmpty()) && (sort == null || sort.isEmpty())) { // 검색
                result = buyRepository.selectSearchList(search, pageable);
            } else if ((sort != null && !sort.isEmpty()) && (search == null || search.isEmpty())) { // 정렬
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
            } else if (search != null && sort != null) { // 검색&&정렬 둘다
                if(sort.equals("최신순")){
                    result = buyRepository.searchNewList(search, pageable);
                }
                if(sort.equals("마감임박순")){
                    result = buyRepository.searchDeadLineList(search, pageable);
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
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정

            BuyDto buyDto = BuyDto.builder()
                    .buyNo(buy.getBuyNo()).title(buy.getTitle()).buyCategory(buy.getBuyCategory())
                    .location(buy.getLocation()).max(buy.getMax()).current(buy.getCurrent())
                    .deadline(buy.getDeadline()).nickname(buy.getNickname()).build();
            
            if(buyImage != null){
                String imageStr = buyImage.getFileName();
                buyDto.setUploadFileNames(List.of(imageStr));
            }else{
                buyDto.setUploadFileNames(List.of(defaultImageStr));
            }
            return buyDto;
        }).collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<BuyDto> responseDTO = PageResponseDto.<BuyDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    // 검색된 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<BuyDto> searchList(PageRequestDto pageRequestDto, String search){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("buyNo").descending());
         
        Page<Object[]> result = buyRepository.selectSearchList(search, pageable);
        List<BuyDto> dtoList = result.get().map(arr -> {
            Buy buy = (Buy) arr[0];
            BuyImage buyImage = (BuyImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정

            BuyDto buyDto = BuyDto.builder()
                    .buyNo(buy.getBuyNo()).title(buy.getTitle()).buyCategory(buy.getBuyCategory())
                    .location(buy.getLocation()).max(buy.getMax()).current(buy.getCurrent())
                    .deadline(buy.getDeadline()).nickname(buy.getNickname()).build();

            if(buyImage != null){
                String imageStr = buyImage.getFileName();
                buyDto.setUploadFileNames(List.of(imageStr));
            }else{
                buyDto.setUploadFileNames(List.of(defaultImageStr));
            }
            return buyDto;
        }).collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<BuyDto> responseDTO = PageResponseDto.<BuyDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    // 선택된 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<BuyDto> sortList(PageRequestDto pageRequestDto, String sort){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("buyNo").descending());
         
        Page<Object[]> result = buyRepository.selectList(pageable);
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

        List<BuyDto> dtoList = result.get().map(arr -> {
            Buy buy = (Buy) arr[0];
            BuyImage buyImage = (BuyImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정
            
            BuyDto buyDto = BuyDto.builder()
                    .buyNo(buy.getBuyNo()).title(buy.getTitle()).buyCategory(buy.getBuyCategory())
                    .location(buy.getLocation()).max(buy.getMax()).current(buy.getCurrent())
                    .deadline(buy.getDeadline()).nickname(buy.getNickname()).build();

            if(buyImage != null){
                String imageStr = buyImage.getFileName();
                buyDto.setUploadFileNames(List.of(imageStr));
            }else{
                buyDto.setUploadFileNames(List.of(defaultImageStr));
            }
            return buyDto;
        }).collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<BuyDto> responseDTO = PageResponseDto.<BuyDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    // 검색 + 선택된 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<BuyDto> searchSortList(PageRequestDto pageRequestDto, String search, String sort){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("buyNo").descending());
         
        Page<Object[]> result = buyRepository.selectList(pageable);
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

        List<BuyDto> dtoList = result.get().map(arr -> {
            Buy buy = (Buy) arr[0];
            BuyImage buyImage = (BuyImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정

            BuyDto buyDto = BuyDto.builder()
                    .buyNo(buy.getBuyNo()).title(buy.getTitle()).buyCategory(buy.getBuyCategory())
                    .location(buy.getLocation()).max(buy.getMax()).current(buy.getCurrent())
                    .deadline(buy.getDeadline()).nickname(buy.getNickname()).build();

            if(buyImage != null){
                String imageStr = buyImage.getFileName();
                buyDto.setUploadFileNames(List.of(imageStr));
            }else{
                buyDto.setUploadFileNames(List.of(defaultImageStr));
            }                    
            return buyDto;
        }).collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<BuyDto> responseDTO = PageResponseDto.<BuyDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    public void add(BuyDto buyDto) { // 공동구매 등록(이미지 포함)
        Buy buy = Buy.DtoToEntity(buyDto);
        buyRepository.save(buy);
    }

    public BuyDto read(int buyNo) { // 공동구매 조회
        Optional<Buy> result = buyRepository.findById(buyNo);
        Buy buy = result.orElseThrow();
        BuyDto buyDto = buy.entityToDto(buy);
        return buyDto;
    }

    @Transactional // DB 작업이 성공적으로 완료될때만 실제 DB에 반영
    public void delete(int buyNo) {
        buyRepository.deleteById(buyNo);
    }
    
    public void modify(BuyDto buyDto) { //수정하기
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

    // 메인에 표기할 최신순
    public List<BuyDto> getLatestBuy() {
        Pageable pageable = PageRequest.of(0, 8, Sort.by("buyNo").descending());
        Page<Object[]> result = null; 
    
        result = buyRepository.latestBuyList(pageable);
    
        List<BuyDto> dtoList = result.getContent().stream().map(arr -> {
            Buy buy = (Buy) arr[0];
            BuyImage buyImage = (BuyImage) arr[1];
    
            BuyDto buyDto = BuyDto.builder()
                    .buyNo(buy.getBuyNo())
                    .title(buy.getTitle())
                    .buyCategory(buy.getBuyCategory())
                    .location(buy.getLocation())
                    .max(buy.getMax())
                    .current(buy.getCurrent())
                    .deadline(buy.getDeadline())
                    .nickname(buy.getNickname())
                    .build();
    
            String imageStr = buyImage.getFileName();
            buyDto.setUploadFileNames(List.of(imageStr));
            return buyDto;
        }).collect(Collectors.toList());
    
        return dtoList;
    }
    
    public void increase(Long buyNo) { // 좋아요 +1
        Optional<Buy> result = buyRepository.findById(buyNo.intValue());
        Buy buy = result.orElseThrow();
        buy.setBuyHit(buy.getBuyHit()+1);
        buyRepository.save(buy);
    }

    public void decrease(Long buyNo) { // 좋아요 -1
        Optional<Buy> result = buyRepository.findById(buyNo.intValue());
        Buy buy = result.orElseThrow();
        buy.setBuyHit(buy.getBuyHit()-1);
        buyRepository.save(buy);
    }

}