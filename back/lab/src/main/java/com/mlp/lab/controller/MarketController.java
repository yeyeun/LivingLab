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
import com.mlp.lab.entity.Market;
import com.mlp.lab.service.MarketService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {
    private final MarketService marketService;

    @GetMapping("/list")
    public PageResponseDto<MarketDto> List(PageRequestDto pageRequestDto){
        return marketService.list(pageRequestDto);
    }

    @GetMapping("/read")
    public ResponseDto<Optional<Market>> read(int marketNo){
        Optional<Market> market = marketService.read(marketNo);
        return ResponseDto.setSuccessData("공동구매"+marketNo, market);
    }

    @PostMapping("/add")    //작성
    public void add(@RequestBody MarketDto marketDto) {
        Market market = Market.createBuy(marketDto);
        marketService.add(market);
    }
}