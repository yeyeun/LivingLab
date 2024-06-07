package com.mlp.lab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.CommunityDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.service.CommunityService;
import com.mlp.lab.util.CustomFileUtilCommunity;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@Log4j2
@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    private final CustomFileUtilCommunity fileUtil;

    @GetMapping("/tip/list") // 목록조회
    public PageResponseDto<CommunityDto> List(PageRequestDto pageRequestDto) {
        return communityService.list(pageRequestDto);
    }

    @GetMapping("/tip/read/{commNo}") // 상세조회
    public CommunityDto read(@PathVariable(name = "commNo") int commNo) {
        return communityService.read(commNo);
    }

    @GetMapping("/tip/display/{fileName}") // 목록조회
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }
    
    @PostMapping("/tip/add") // 작성(이미지 포함)
    public void add(CommunityDto communityDto) {
        List<MultipartFile> files = communityDto.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        if(uploadFileNames == null || uploadFileNames.isEmpty()){
            communityDto.setFlag(false);
        }
        else{
            communityDto.setFlag(true);
        }
        communityDto.setUploadFileNames(uploadFileNames);
        log.info("===========tip add : " + communityDto);
        communityService.add(communityDto);
    }

    @PutMapping("/tip/modify/{commNo}") // 수정
    public ResponseDto<CommunityDto> modify(@PathVariable(name = "commNo") Long commNo, CommunityDto communityDto) {
        communityDto.setCommNo(commNo);
        CommunityDto oldDto = communityService.read(commNo.intValue());
        // 기존 파일들(데이터베이스에 저장된 파일 이름)

        List<String> oldFileNames = oldDto.getUploadFileNames();
        // 새로 업로드해야 하는 파일들

        List<MultipartFile> files = communityDto.getFiles();
        // 새로 업로드된 파일 이름들

        List<String> newUploadFileNames = fileUtil.saveFiles(files);
        // 변화가 없이 유지되는 파일들

        List<String> uploadedFileNames = communityDto.getUploadFileNames();
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야하는 파일 목록
        if (newUploadFileNames != null && newUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(newUploadFileNames);
        }
        
        communityService.modify(communityDto);

        if (oldFileNames != null && oldFileNames.size() > 0) {
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            // 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return ResponseDto.setSuccessData("수정되었습니다.", communityDto);
    }
}