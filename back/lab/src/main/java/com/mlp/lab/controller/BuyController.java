package com.mlp.lab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.service.BuyService;
import com.mlp.lab.util.CustomFileUtilBuy;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/buy")
@RequiredArgsConstructor
public class BuyController {
    private final BuyService buyService;
    private final CustomFileUtilBuy fileUtil;

    @GetMapping("/list") // 목록조회(검색기능 포함)
    public PageResponseDto<BuyDto> List(PageRequestDto pageRequestDto,
            @RequestParam(required = false, value = "search") String search,
            @RequestParam(required = false, value = "sort") String sort) {
        return buyService.list(pageRequestDto, search, sort);
    }

    @GetMapping("/read/{buyNo}") // 상세조회
    public BuyDto read(@PathVariable(name = "buyNo") int buyNo) {
        return buyService.read(buyNo);
    }


    // 글 삭제 (이미지 포함)
    @DeleteMapping("/delete/{buyNo}")
    public void delete(@PathVariable(name = "buyNo") int buyNo) {
        List<String> uploadFileNames = buyService.read(buyNo).getUploadFileNames();
        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            fileUtil.deleteFiles(uploadFileNames);
        }
        buyService.delete(buyNo);
    }

    @GetMapping("/display/{fileName}") // 목록조회
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }

    @PostMapping("/add") // 작성
    public void add(BuyDto buyDto) {
        List<MultipartFile> files = buyDto.getFiles();
        List<String> uploadFileNames = fileUtil.saveFiles(files);
        buyDto.setUploadFileNames(uploadFileNames);
        buyService.add(buyDto);
    }

    @PutMapping("/modify/{buyNo}") // 수정
    public void modify(@PathVariable(name = "buyNo") Long buyNo, BuyDto buyDto) {
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
    }

    @GetMapping("/latest")
    public List<BuyDto> getLatestBuyList() {
        return buyService.getLatestBuy();
    }
}