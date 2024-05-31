package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.entity.Buy;
import com.mlp.lab.service.BuyService;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/buy")
@RequiredArgsConstructor
public class BuyController {
    private final BuyService buyService;

    @GetMapping("/list")    //목록조회
    public PageResponseDto<BuyDto> List(PageRequestDto pageRequestDto){
        return buyService.list(pageRequestDto);
    }

    @GetMapping("/read")    //상세조회
    public ResponseDto<Optional<Buy>> read(int buyNo){
        Optional<Buy> buy = buyService.read(buyNo);
        return ResponseDto.setSuccessData("공동구매"+buyNo, buy);
    }

    @PostMapping("/add")    //작성
    public void add(@RequestBody BuyDto buyDto) {
        Buy buy = Buy.createBuy(buyDto);
        buyService.add(buy);
    }
}