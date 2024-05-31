package com.mlp.lab.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.TeamDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.entity.Market;
import com.mlp.lab.entity.Team;
import com.mlp.lab.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {
    private final ModelMapper modelMapper;
    private final TeamRepository teamRepository;

    public PageResponseDto<TeamDto> list(PageRequestDto pageRequestDto){
        Pageable pageable = PageRequest.of(
            pageRequestDto.getPage()-1,
            pageRequestDto.getSize(),
            Sort.by("teamNo").descending());
         
        Page<Team> result = teamRepository.findAll(pageable);
        List<TeamDto> dtoList = result.getContent().stream()
            .map(team-> modelMapper.map(team, TeamDto.class))
            .collect(Collectors.toList());     
            
        long totalCount = result.getTotalElements();
        PageResponseDto<TeamDto> responseDTO = PageResponseDto.<TeamDto>withAll()
            .dtoList(dtoList)
            .pageRequestDto(pageRequestDto)
            .totalCount(totalCount)
            .build();
        return responseDTO;
    }

    public Optional<Team> read(int teamNo){
        Optional<Team> team = teamRepository.findById(teamNo);
        return team;
    }

    public void add(Team team){  
        teamRepository.save(team);
    }
}