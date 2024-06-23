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

import com.mlp.lab.dto.TeamDto;
import com.mlp.lab.dto.CommunityDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.TeamDto;
import com.mlp.lab.entity.Team;
import com.mlp.lab.entity.TeamImage;
import com.mlp.lab.entity.Community;
import com.mlp.lab.entity.Team;
import com.mlp.lab.entity.TeamImage;
import com.mlp.lab.repository.TeamRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    // 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<TeamDto> list(PageRequestDto pageRequestDto, String search, String sort) {
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("teamNo").descending());

        Page<Object[]> result = null;
        if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 페이지 클릭 시
            result = teamRepository.selectList(pageable);
        } else if ((search != null && !search.isEmpty()) && (sort == null || sort.isEmpty())) { // 검색
            result = teamRepository.selectSearchList(search, pageable);
        } else if ((sort != null && !sort.isEmpty()) && (search == null || search.isEmpty())) { // 정렬
            if (sort.equals("최신순")) {
                result = teamRepository.newList(pageable);
            }
            if (sort.equals("마감임박순")) {
                result = teamRepository.deadLineList(pageable);
            }
            // if(sort.equals("거리순")){
            // result =
            // }
            // if(sort.equals("좋아요순")){
            // result =
            // }
        } else if (search != null && sort != null) { // 검색&&정렬 둘다
            if (sort.equals("최신순")) {
                result = teamRepository.searchNewList(search, pageable);
            }
            if (sort.equals("마감임박순")) {
                result = teamRepository.searchDeadLineList(search, pageable);
            }
            // if(sort.equals("거리순")){
            // result =
            // }
            // if(sort.equals("좋아요순")){
            // result =
            // }
        }
        List<TeamDto> dtoList = result.get().map(arr -> {
            Team team = (Team) arr[0];
            TeamImage teamImage = (TeamImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정

            TeamDto teamDto = TeamDto.builder()
                    .teamNo(team.getTeamNo()).title(team.getTitle()).teamCategory(team.getTeamCategory())
                    .location(team.getLocation()).max(team.getMax()).current(team.getCurrent())
                    .deadline(team.getDeadline()).nickname(team.getNickname()).teamHit(team.getTeamHit()).build();
            
            if(teamImage != null){
                String imageStr = teamImage.getFileName();
                teamDto.setUploadFileNames(List.of(imageStr));
            }else{
                teamDto.setUploadFileNames(List.of(defaultImageStr));
            }
            return teamDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<TeamDto> responseDTO = PageResponseDto.<TeamDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }

    // 검색된 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<TeamDto> searchList(PageRequestDto pageRequestDto, String search) {
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("teamNo").descending());

        Page<Object[]> result = teamRepository.selectSearchList(search, pageable);
        List<TeamDto> dtoList = result.get().map(arr -> {
            Team team = (Team) arr[0];
            TeamImage teamImage = (TeamImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정

            TeamDto teamDto = TeamDto.builder()
                    .teamNo(team.getTeamNo()).title(team.getTitle()).teamCategory(team.getTeamCategory())
                    .location(team.getLocation()).max(team.getMax()).current(team.getCurrent())
                    .deadline(team.getDeadline()).nickname(team.getNickname()).build();

            if(teamImage != null){
                String imageStr = teamImage.getFileName();
                teamDto.setUploadFileNames(List.of(imageStr));
            }else{
                teamDto.setUploadFileNames(List.of(defaultImageStr));
            }
            return teamDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<TeamDto> responseDTO = PageResponseDto.<TeamDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }

    // 선택된 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<TeamDto> sortList(PageRequestDto pageRequestDto, String sort) {
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("teamNo").descending());

        Page<Object[]> result = teamRepository.selectList(pageable);
        if (sort.equals("최신순")) {
            result = teamRepository.newList(pageable);
        }
        if (sort.equals("마감임박순")) {
            result = teamRepository.deadLineList(pageable);
        }
        // if(sort.equals("거리순")){
        // result =
        // }
        // if(sort.equals("좋아요순")){
        // result =
        // }

        List<TeamDto> dtoList = result.get().map(arr -> {
            Team team = (Team) arr[0];
            TeamImage teamImage = (TeamImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정
            
            TeamDto teamDto = TeamDto.builder()
                    .teamNo(team.getTeamNo()).title(team.getTitle()).teamCategory(team.getTeamCategory())
                    .location(team.getLocation()).max(team.getMax()).current(team.getCurrent())
                    .deadline(team.getDeadline()).nickname(team.getNickname()).build();

            if(teamImage != null){
                String imageStr = teamImage.getFileName();
                teamDto.setUploadFileNames(List.of(imageStr));
            }else{
                teamDto.setUploadFileNames(List.of(defaultImageStr));
            }
            return teamDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<TeamDto> responseDTO = PageResponseDto.<TeamDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }

    // 검색 + 선택된 목록 가져오기(페이징 처리, 이미지 포함)
    public PageResponseDto<TeamDto> searchSortList(PageRequestDto pageRequestDto, String search, String sort) {
        Pageable pageable = PageRequest.of(
                pageRequestDto.getPage() - 1,
                pageRequestDto.getSize(),
                Sort.by("teamNo").descending());

        Page<Object[]> result = teamRepository.selectList(pageable);
        if (sort.equals("최신순")) {
            result = teamRepository.searchNewList(sort, pageable);
        }
        if (sort.equals("마감임박순")) {
            result = teamRepository.searchDeadLineList(sort, pageable);
        }
        // if(sort.equals("거리순")){
        // result =
        // }
        // if(sort.equals("좋아요순")){
        // result =
        // }

        List<TeamDto> dtoList = result.get().map(arr -> {
            Team team = (Team) arr[0];
            TeamImage teamImage = (TeamImage) arr[1];
            String defaultImageStr = "default.png";// 기본 이미지 파일명 설정

            TeamDto teamDto = TeamDto.builder()
                    .teamNo(team.getTeamNo()).title(team.getTitle()).teamCategory(team.getTeamCategory())
                    .location(team.getLocation()).max(team.getMax()).current(team.getCurrent())
                    .deadline(team.getDeadline()).nickname(team.getNickname()).build();

            if(teamImage != null){
                String imageStr = teamImage.getFileName();
                teamDto.setUploadFileNames(List.of(imageStr));
            }else{
                teamDto.setUploadFileNames(List.of(defaultImageStr));
            }                    
            return teamDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        PageResponseDto<TeamDto> responseDTO = PageResponseDto.<TeamDto>withAll()
                .dtoList(dtoList)
                .pageRequestDto(pageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }

    public void add(TeamDto teamDto) { // 동네모임 등록(이미지 포함)
        Team team = Team.DtoToEntity(teamDto);
        teamRepository.save(team);
    }

    public TeamDto read(int teamNo) { // 동네모임 조회
        Optional<Team> result = teamRepository.findById(teamNo);
        Team team = result.orElseThrow();
        TeamDto teamDto = team.entityToDto(team);
        return teamDto;
    }

    @Transactional // DB 작업이 성공적으로 완료될때만 실제 DB에 반영
    public void delete(int teamNo) {
        teamRepository.deleteById(teamNo);
    }

    public void modify(TeamDto teamDto) { // 수정하기
        // 조회
        Optional<Team> result = teamRepository.findById(teamDto.getTeamNo().intValue());
        Team team = result.orElseThrow();

        // 수정
        team.setTitle(teamDto.getTitle());
        team.setContent(teamDto.getContent());
        team.setLocation(teamDto.getLocation());
        team.setTeamCategory(teamDto.getTeamCategory());
        team.setDeadline(teamDto.getDeadline());

        // 파일들 삭제
        team.clearList();
        List<String> uploadFileNames = teamDto.getUploadFileNames();
        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                team.addImageString(uploadName);
            });
        }
        teamRepository.save(team);
    }

    public List<TeamDto> getLatestTeam() {
        Pageable pageable = PageRequest.of(0, 6, Sort.by("teamNo").descending());
        Page<Object[]> result = null;

        result = teamRepository.latestTeamList(pageable);

        List<TeamDto> dtoList = result.getContent().stream().map(arr -> {
            Team team = (Team) arr[0];
            TeamImage teamImage = (TeamImage) arr[1];

            TeamDto teamDto = TeamDto.builder()
                    .teamNo(team.getTeamNo())
                    .title(team.getTitle())
                    .teamCategory(team.getTeamCategory())
                    .location(team.getLocation())
                    .max(team.getMax())
                    .current(team.getCurrent())
                    .deadline(team.getDeadline())
                    .nickname(team.getNickname())
                    .content(team.getContent())
                    .build();

            String imageStr = teamImage.getFileName();
            teamDto.setUploadFileNames(List.of(imageStr));
            return teamDto;
        }).collect(Collectors.toList());

        return dtoList;
    }
}