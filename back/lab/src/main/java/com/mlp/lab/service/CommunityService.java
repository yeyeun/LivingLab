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
import org.springframework.transaction.annotation.Transactional;

import com.mlp.lab.dto.CommunityDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.entity.Community;
import com.mlp.lab.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final ModelMapper modelMapper;

    public PageResponseDto<CommunityDto> listTip(PageRequestDto pageRequestDto, String search, String sort) { // 커뮤니티 게시글 목록가져오기(페이징처리, 이미지 포함)
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("commNo").descending());
        Page<Community> result = null;
        if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 검색어 없을 시(전체 리스트)
            result = communityRepository.tipList(pageable);
        }
        if (search != null && !search.isEmpty()) { // 검색어 있을 시
            result = communityRepository.tipSearchList(pageable, search);
        }
        if (sort != null && !sort.isEmpty()) { // 카테고리별
            if (sort.equals("부동산")) {
                result = communityRepository.tipSelectList(pageable, '1');
            }
            if (sort.equals("인테리어")) {
                result = communityRepository.tipSelectList(pageable, '2');
            }
            if (sort.equals("할인정보")) {
                result = communityRepository.tipSelectList(pageable, '3');
            }
            if (sort.equals("기타")) {
                result = communityRepository.tipSelectList(pageable, '4');
            }
        }
        if (search != null && sort != null) { // 카테고리&정렬
            if (sort.equals("부동산")) {
                result = communityRepository.tipSearchSelectList(pageable, search, '1');
            }
            if (sort.equals("인테리어")) {
                result = communityRepository.tipSearchSelectList(pageable, search, '2');
            }
            if (sort.equals("할인정보")) {
                result = communityRepository.tipSearchSelectList(pageable, search, '3');
            }
            if (sort.equals("기타")) {
                result = communityRepository.tipSearchSelectList(pageable, search, '4');
            }
        }
        List<CommunityDto> dtoList = result.getContent().stream()
                .map(tip -> modelMapper.map(tip, CommunityDto.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<CommunityDto> responseDto = PageResponseDto.<CommunityDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDto;
    }

    public PageResponseDto<CommunityDto> listQna(PageRequestDto pageRequestDto, String search, String sort) { 
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("commNo").descending());
        Page<Community> result = null;
        if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 검색어 없을 시(전체 리스트)
            result = communityRepository.qnaList(pageable);
        }
        if (search != null && !search.isEmpty()) { // 검색어 있을 시
            result = communityRepository.qnaSearchList(pageable, search);
        }
        if (sort != null && !sort.isEmpty()) { // 카테고리별
            if (sort.equals("부동산")) {
                result = communityRepository.qnaSelectList(pageable, '1');
            }
            if (sort.equals("인테리어")) {
                result = communityRepository.qnaSelectList(pageable, '2');
            }
            if (sort.equals("할인정보")) {
                result = communityRepository.qnaSelectList(pageable, '3');
            }
            if (sort.equals("기타")) {
                result = communityRepository.qnaSelectList(pageable, '4');
            }
        }
        if (search != null && sort != null) { // 카테고리&정렬
            if (sort.equals("부동산")) {
                result = communityRepository.qnaSearchSelectList(pageable, search, '1');
            }
            if (sort.equals("인테리어")) {
                result = communityRepository.qnaSearchSelectList(pageable, search, '2');
            }
            if (sort.equals("할인정보")) {
                result = communityRepository.qnaSearchSelectList(pageable, search, '3');
            }
            if (sort.equals("기타")) {
                result = communityRepository.qnaSearchSelectList(pageable, search, '4');
            }
        }
        List<CommunityDto> dtoList = result.getContent().stream()
                .map(tip -> modelMapper.map(tip, CommunityDto.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<CommunityDto> responseDto = PageResponseDto.<CommunityDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDto;
    }

    public PageResponseDto<CommunityDto> listReview(PageRequestDto pageRequestDto, String search, String sort) {
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("commNo").descending());
        Page<Community> result = null;
        if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 검색어 없을 시(전체 리스트)
            result = communityRepository.reviewList(pageable);
        }
        if (search != null && !search.isEmpty()) { // 검색어 있을 시
            result = communityRepository.reviewSearchList(pageable, search);
        }
        if (sort != null && !sort.isEmpty()) { // 카테고리별
            if (sort.equals("부동산")) {
                result = communityRepository.reviewSelectList(pageable, '1');
            }
            if (sort.equals("인테리어")) {
                result = communityRepository.reviewSelectList(pageable, '2');
            }
            if (sort.equals("할인정보")) {
                result = communityRepository.reviewSelectList(pageable, '3');
            }
            if (sort.equals("기타")) {
                result = communityRepository.reviewSelectList(pageable, '4');
            }
        }
        if (search != null && sort != null) { // 카테고리&정렬
            if (sort.equals("부동산")) {
                result = communityRepository.reviewSearchSelectList(pageable, search, '1');
            }
            if (sort.equals("인테리어")) {
                result = communityRepository.reviewSearchSelectList(pageable, search, '2');
            }
            if (sort.equals("할인정보")) {
                result = communityRepository.reviewSearchSelectList(pageable, search, '3');
            }
            if (sort.equals("기타")) {
                result = communityRepository.reviewSearchSelectList(pageable, search, '4');
            }
        }
        List<CommunityDto> dtoList = result.getContent().stream()
                .map(tip -> modelMapper.map(tip, CommunityDto.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<CommunityDto> responseDto = PageResponseDto.<CommunityDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDto;
    }

    public PageResponseDto<CommunityDto> listHelp(PageRequestDto pageRequestDto, String search) { 
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("commNo").descending());
        Page<Community> result = null;
        if (search == null || search.isEmpty()) { // 검색어 없을 시(전체 리스트)
            result = communityRepository.selectHelpList(pageable);
        } else { // 검색어 있을 시
            result = communityRepository.helpSearchList(pageable, search);
        }
        List<CommunityDto> dtoList = result.getContent().stream()
                .map(tip -> modelMapper.map(tip, CommunityDto.class)).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<CommunityDto> responseDto = PageResponseDto.<CommunityDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDto;
    }

    public void add(CommunityDto communityDto) { // 커뮤니티 게시글 등록(이미지 포함)
        Community community = Community.DtoToEntity(communityDto);
        communityRepository.save(community);
    }

    public CommunityDto read(int commNo) { // 커뮤니티 특정 게시글 조회
        Optional<Community> result = communityRepository.findById(commNo);
        Community community = result.orElseThrow();
        CommunityDto communityDto = community.entityToDto(community);
        return communityDto;
    }

    public void modify(CommunityDto communityDto) { // 커뮤니티 게시글 수정하기
        // 1.조회
        Optional<Community> result = communityRepository.findById(communityDto.getCommNo().intValue());
        Community community = result.orElseThrow();

        // 수정
        community.setTitle(communityDto.getTitle());
        community.setContent(communityDto.getContent());
        community.setCommCategory(communityDto.getCommCategory());
        community.setFlag(communityDto.isFlag());

        // 파일들 삭제
        community.clearList();
        List<String> uploadFileNames = communityDto.getUploadFileNames();
        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                community.addImageString(uploadName);
            });
        }
        communityRepository.save(community);
    }

    @Transactional // DB 작업이 성공적으로 완료될때만 실제 DB에 반영
    public void delete(int commNo) {
        communityRepository.deleteById(commNo);
    }

}