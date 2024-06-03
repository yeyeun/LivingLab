package com.mlp.lab.ServiceTest;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.PageRequestDto;
import com.mlp.lab.dto.PageResponseDto;
import com.mlp.lab.service.BuyService;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class BuyServiceTest {
    @Autowired
    private BuyService buyService;

    @Test
    public void testList() {
        PageRequestDto pageRequestDto = PageRequestDto.builder().build();
        PageResponseDto<BuyDto> result = buyService.list(pageRequestDto);
        result.getDtoList().forEach(dto -> log.info(dto));
    }

    @Test
    public void testADD() {
        BuyDto buyDto = BuyDto.builder()
            .title("쿠팡 같이 시키실분")
            .buyCategory('1')
            .location("강남역 4번 출구 앞")
            .build();
        buyDto.setUploadFileNames(
                List.of(UUID.randomUUID() + "_" + "test1.jpg",
                        UUID.randomUUID() + "_" + "test2.jpg"));
        
        buyService.add(buyDto);
    }
}
