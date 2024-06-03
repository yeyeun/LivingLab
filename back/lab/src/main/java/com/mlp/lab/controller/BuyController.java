package com.mlp.lab.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
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

    @GetMapping("/list") // 목록조회
    public PageResponseDto<BuyDto> List(PageRequestDto pageRequestDto) {
        return buyService.list(pageRequestDto);
    }

    @GetMapping("/{buyNo}") // 상세조회
    public BuyDto read(@PathVariable(name="buyNo") int buyNo) {
        return buyService.read(buyNo);
    }

    @PostMapping("/add") // 작성(이미지 포함)
    public void add(BuyDto buyDto) {
        log.info("add : " + buyDto);
        List<MultipartFile> files = buyDto.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        buyDto.setUploadFileNames(uploadFileNames);
        buyService.add(buyDto);
    }
}