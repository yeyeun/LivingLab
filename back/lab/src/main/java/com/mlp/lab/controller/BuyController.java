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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.service.BuyService;
import com.mlp.lab.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/buy")
@RequiredArgsConstructor
public class BuyController {
    private final BuyService buyService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/list") // 목록조회(검색, 정렬 기능 포함)
    public PageResponseDto<BuyDto> List(PageRequestDto pageRequestDto,
            @RequestParam(required = false, value = "search") String search, @RequestParam(required = false, value = "sort") String sort) {
        PageResponseDto<BuyDto> result = new PageResponseDto<>(null, pageRequestDto, 0);
        if (search == null && sort == null) {   //페이지 클릭 시
            result = buyService.list(pageRequestDto);
        } else if(search != null && sort == null){  //검색만 할 경우
            result = buyService.searchList(pageRequestDto, search);
        } else if(search == null && sort != null){  //정렬만 할 경우
            result = buyService.sortList(pageRequestDto, sort);
        } else if(search != null && sort != null){    //검색&&정렬 둘다
            result = buyService.searchSortList(pageRequestDto, search, sort);
        } 
        return result;
    }

    @GetMapping("/read/{buyNo}") // 상세조회
    public BuyDto read(@PathVariable(name = "buyNo") int buyNo) {
        return buyService.read(buyNo);
    }

    @GetMapping("/display/{fileName}") // 이미지 출력
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @PostMapping("/add") // 작성(이미지 포함)
    public void add(BuyDto buyDto) {
        log.info("add : " + buyDto);
        List<MultipartFile> files = buyDto.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        buyDto.setUploadFileNames(uploadFileNames);
        buyService.add(buyDto);
    }

    @PutMapping("/modify/{buyNo}") // 수정
    public ResponseDto<BuyDto> modify(@PathVariable(name = "buyNo") Long buyNo, BuyDto buyDto) {
        buyDto.setBuyNo(buyNo);
        BuyDto oldDto = buyService.read(buyNo.intValue());
        // 기존 파일들(데이터베이스에 저장된 파일 이름)

        List<String> oldFileNames = oldDto.getUploadFileNames();
        // 새로 업로드해야 하는 파일들

        List<MultipartFile> files = buyDto.getFiles();
        // 새로 업로드된 파일 이름들

        List<String> newUploadFileNames = fileUtil.saveFiles(files);
        // 변화가 없이 유지되는 파일들

        List<String> uploadedFileNames = buyDto.getUploadFileNames();
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야하는 파일 목록
        if (newUploadFileNames != null && newUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(newUploadFileNames);
        }

        buyService.modify(buyDto);

        if (oldFileNames != null && oldFileNames.size() > 0) {
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            // 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return ResponseDto.setSuccessData("수정되었습니다.", buyDto);
    }
}