package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.service.part.PartService;
import com.mlp.lab.dto.PartUserDto;
import com.mlp.lab.dto.PartUserListDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/part")
public class PartController {

  private final PartService partService;

  @PostMapping("/add")
  public List<PartUserListDto> addPart(@RequestBody PartUserDto partUserDto,
      @RequestParam(name = "teamNo") Long teamNo) {
    log.info(partUserDto);
    log.info(teamNo);
    return partService.add(partUserDto, teamNo);
  }

  @GetMapping("/users/team/{teamNo}")
  public List<PartUserListDto> getPartUsers(@PathVariable(name = "teamNo") Long teamNo) {

    // Long teamNo = partUserDto.getTeamNo();

    log.info("teamNo : " + teamNo);

    return partService.getPartUsers(teamNo);
  }

  // 참여목록에서 빠지기
  @DeleteMapping("/delete/{pino}")
  public List<PartUserListDto> removeFromPart(@PathVariable(name = "pino") Long pino) {

    return partService.remove(pino);
  }
}
