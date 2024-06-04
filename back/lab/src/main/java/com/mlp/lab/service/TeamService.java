package com.mlp.lab.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.TeamDto;
import com.mlp.lab.entity.Team;
import com.mlp.lab.entity.TeamImage;
import com.mlp.lab.repository.TeamRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final TeamRepository teamRepository;

    public PageResponseDto<TeamDto> list(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("teamNo").descending());
         
        Page<Object[]> result = teamRepository.selectList(pageable);
        List<TeamDto> dtoList = result.get().map(arr -> {
            Team team = (Team) arr[0];
            TeamImage teamImage = (TeamImage) arr[1];

            TeamDto teamDto = TeamDto.builder()
                    .teamNo(team.getTeamNo()).title(team.getTitle()).teamCategory(team.getTeamCategory())
                    .location(team.getLocation()).max(team.getMax()).current(team.getCurrent())
                    .deadline(team.getDeadline()).nickname(team.getNickname()).build();

            String imageStr = teamImage.getFileName();
            teamDto.setUploadFileNames(List.of(imageStr));
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

    
    public void modify(TeamDto teamDto) { //수정하기
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
}