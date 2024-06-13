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

import com.mlp.lab.dto.MarketDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.service.MarketService;
import com.mlp.lab.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {
    private final MarketService marketService;
    private final CustomFileUtil fileUtil;

    @GetMapping("/list") // 목록조회(검색, 정렬 기능 포함)
    public PageResponseDto<MarketDto> List(PageRequestDto pageRequestDto,
            @RequestParam(required = false, value = "search") String search,
            @RequestParam(required = false, value = "sort") String sort) {
        return marketService.list(pageRequestDto, search, sort);
    }

    @GetMapping("/read/{marketNo}") // 상세조회
    public MarketDto read(@PathVariable(name = "marketNo") int marketNo) {
        return marketService.read(marketNo);
    }

    @GetMapping("/delete/{marketNo}") // 삭제
    public void remove(@PathVariable(name = "marketNo") Long marketNo) {
        marketService.remove(marketNo.intValue());
    }

    @GetMapping("/display/{fileName}") // 이미지 출력
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @PostMapping("/add") // 작성(이미지 포함)
    public void add(MarketDto marketDto) {
        log.info("add : " + marketDto);
        List<MultipartFile> files = marketDto.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        marketDto.setUploadFileNames(uploadFileNames);
        marketService.add(marketDto);
    }

    @PutMapping("/modify/{buyNo}") // 수정
    public ResponseDto<MarketDto> modify(@PathVariable(name = "buyNo") Long marketNo, MarketDto marketDto) {
        marketDto.setMarketNo(marketNo);
        MarketDto oldDto = marketService.read(marketNo.intValue());
        // 기존 파일들(데이터베이스에 저장된 파일 이름)

        List<String> oldFileNames = oldDto.getUploadFileNames();
        // 새로 업로드해야 하는 파일들

        List<MultipartFile> files = marketDto.getFiles();
        // 새로 업로드된 파일 이름들

        List<String> newUploadFileNames = fileUtil.saveFiles(files);
        // 변화가 없이 유지되는 파일들

        List<String> uploadedFileNames = marketDto.getUploadFileNames();
        // 유지되는 파일들 + 새로 업로드된 파일 이름들이 저장해야하는 파일 목록
        if (newUploadFileNames != null && newUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(newUploadFileNames);
        }

        marketService.modify(marketDto);

        if (oldFileNames != null && oldFileNames.size() > 0) {
            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());
            // 파일 삭제
            fileUtil.deleteFiles(removeFiles);
        }
        return ResponseDto.setSuccessData("수정되었습니다.", marketDto);
    }
}