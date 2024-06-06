package com.mlp.lab.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.CommunityDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.entity.Community;
import com.mlp.lab.entity.CommunityImage;
import com.mlp.lab.repository.CommunityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityRepository communityRepository;

    public PageResponseDto<CommunityDto> list(PageRequestDto pageRequestDto) { // 커뮤니티 게시글 목록 가져오기(페이징 처리, 이미지 포함)
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("commNo").descending());

        Page<Object[]> result = communityRepository.selectList(pageable);
        List<CommunityDto> dtoList = result.get().map(arr -> {
            Community community = (Community) arr[0];
            CommunityImage communityImage = (CommunityImage) arr[1];

            CommunityDto communityDto = CommunityDto.builder().commNo(community.getCommNo()).type(community.getType())
                            .title(community.getTitle()).regDate(community.getCreatedDate()).nickname(community.getNickname()).build();

            String imageStr = communityImage.getFileName();
            communityDto.setUploadFileNames(List.of(imageStr));
            return communityDto;
        }).collect(Collectors.toList());

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

    public void modify(CommunityDto communityDto) { //커뮤니티 게시글 수정하기
        // 1.조회
        Optional<Community> result = communityRepository.findById(communityDto.getCommNo().intValue());
        Community community = result.orElseThrow();

        // 수정
        community.setTitle(communityDto.getTitle());
        community.setContent(communityDto.getContent());
        community.setCommCategory(communityDto.getCommCategory());

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

}