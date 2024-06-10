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

    // 목록조회
    @GetMapping("/tip/list")
    public PageResponseDto<CommunityDto> ListTip(PageRequestDto pageRequestDto) {
        return communityService.listTip(pageRequestDto);
    }

    @GetMapping("/qna/list")
    public PageResponseDto<CommunityDto> ListQna(PageRequestDto pageRequestDto) {
        return communityService.listQna(pageRequestDto);
    }

    @GetMapping("/review/list")
    public PageResponseDto<CommunityDto> ListReview(PageRequestDto pageRequestDto) {
        return communityService.listReview(pageRequestDto);
    }

    @GetMapping("/help/list")
    public PageResponseDto<CommunityDto> ListHelp(PageRequestDto pageRequestDto) {
        return communityService.listHelp(pageRequestDto);
    }
    
    // 상세조회
    @GetMapping(value={"/tip/read/{commNo}","/qna/read/{commNo}","/review/read/{commNo}","/help/read/{commNo}"})
    public CommunityDto read(@PathVariable(name = "commNo") int commNo) {
        return communityService.read(commNo);
    }

    // 사진조회
    @GetMapping(value={"/tip/display/{fileName}","/qna/display/{fileName}","/review/display/{fileName}","/help/display/{fileName}"})
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    // 글 작성 (이미지 포함)
    @PostMapping(value={"/tip/add","/qna/add","/review/add","/help/add"})
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
        log.info("===========community add : " + communityDto);
        communityService.add(communityDto);
    }

    // 글 수정 (이미지 포함)
    @PutMapping(value={"/tip/modify/{commNo}","/qna/modify/{commNo}","/review/modify/{commNo}","/help/modify/{commNo}"})
    public void modify(@PathVariable(name = "commNo") Long commNo, CommunityDto communityDto) {
        log.info("========DTO" + communityDto);
        communityDto.setCommNo(commNo);
        CommunityDto oldDto = communityService.read(commNo.intValue());

        // 기존 파일들(데이터베이스에 저장된 파일 이름)
        List<String> oldFileNames = oldDto.getUploadFileNames();

        // 새로 업로드해야 하는 파일들
        List<MultipartFile> files = communityDto.getFiles();

        // 새로 업로드된 파일 이름들
        List<String> newUploadFileNames = fileUtil.saveFiles(files);

        // 수정된 기존 파일들 (DB에 저장된 파일 이름과 동일한지, 삭제된게 있는지 확인해야함)
        List<String> uploadedFileNames = communityDto.getUploadFileNames();
        
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야하는 파일 목록
        if (newUploadFileNames != null && newUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(newUploadFileNames);
        }


        // 이미지 여부에 따라 flag 설정
        if ((uploadedFileNames == null || uploadedFileNames.isEmpty()) && (files == null || files.isEmpty())) {
            log.info("이미지 없음========");
            communityDto.setFlag(false);
        }
        else{
            log.info("이미지 있음========");
            communityDto.setFlag(true);
        }


        communityService.modify(communityDto);

        if (oldFileNames != null && oldFileNames.size() > 0) {
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            // 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
    }

    
}