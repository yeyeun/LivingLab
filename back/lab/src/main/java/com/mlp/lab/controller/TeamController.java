package com.mlp.lab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.dto.TeamDto;
import com.mlp.lab.service.TeamService;
import com.mlp.lab.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {
    private final TeamService teamService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/list")    // 목록조회
    public PageResponseDto<TeamDto> List(PageRequestDto pageRequestDto){
        return teamService.list(pageRequestDto);
    }

    @GetMapping("/read/{teamNo}")   // 상세조회
    public TeamDto read(@PathVariable(name = "teamNo") int teamNo){
        return teamService.read(teamNo);
    }

    @GetMapping("/display/{fileName}") // 목록조회
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @PostMapping("/add")    //작성
    public void add(TeamDto teamDto) {
        List<MultipartFile> files = teamDto.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        teamDto.setUploadFileNames(uploadFileNames);
        teamService.add(teamDto);
    }

    @PutMapping("/modify/{buyNo}") // 수정
    public ResponseDto<TeamDto> modify(@PathVariable(name = "buyNo") Long teamNo, TeamDto teamDto) {
        teamDto.setTeamNo(teamNo);
        TeamDto oldDto = teamService.read(teamNo.intValue());
        // 기존 파일들(데이터베이스에 저장된 파일 이름)

        List<String> oldFileNames = oldDto.getUploadFileNames();
        // 새로 업로드해야 하는 파일들

        List<MultipartFile> files = teamDto.getFiles();
        // 새로 업로드된 파일 이름들

        List<String> newUploadFileNames = fileUtil.saveFiles(files);
        // 변화가 없이 유지되는 파일들

        List<String> uploadedFileNames = teamDto.getUploadFileNames();
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야하는 파일 목록
        if (newUploadFileNames != null && newUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(newUploadFileNames);
        }
        
        teamService.modify(teamDto);

        if (oldFileNames != null && oldFileNames.size() > 0) {
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            // 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return ResponseDto.setSuccessData("수정되었습니다.", teamDto);
    }
}