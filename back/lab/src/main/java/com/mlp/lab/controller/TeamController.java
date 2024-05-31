package com.mlp.lab.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.MarketDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.dto.TeamDto;
import com.mlp.lab.entity.Market;
import com.mlp.lab.entity.Team;
import com.mlp.lab.service.TeamService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;

    @GetMapping("/list")
    public PageResponseDto<TeamDto> List(PageRequestDto pageRequestDto){
        return teamService.list(pageRequestDto);
    }

    @GetMapping("/read")
    public ResponseDto<Optional<Team>> read(int teamNo){
        Optional<Team> team = teamService.read(teamNo);
        return ResponseDto.setSuccessData("공동구매"+teamNo, team);
    }

    @PostMapping("/add")    //작성
    public void add(@RequestBody TeamDto teamDto) {
        Team team = Team.createBuy(teamDto);
        teamService.add(team);
    }
}