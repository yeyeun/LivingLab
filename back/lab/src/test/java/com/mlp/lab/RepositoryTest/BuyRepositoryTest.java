package com.mlp.lab.RepositoryTest;

import java.util.Random;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mlp.lab.entity.Buy;
import com.mlp.lab.repository.BuyRepository;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class BuyRepositoryTest {
    @Autowired
    private BuyRepository buyRepository;

    @Test
    public void testInsert() {
        Random r = new Random();
        int j = 1;

        for (Long i = (long) 1; i <= 10; i++) {
            int ran = r.nextInt(4)+1;
            char cate = '0';
            if(ran==1){
                cate = '1';
            }
            if(ran==2){
                cate = '2';
            }
            if(ran==3){
                cate = '3';
            }
            if(ran==4){
                cate = '4';
            }
            Buy buy = Buy.builder()
                    .buyNo(i).title("글 제목 : "+i).location("장소 : "+i)
                    .buyCategory(cate).max(j).current(j-1)
                    .deadline(i+"월 "+i+"일").nickname("유저 : "+i).build();
            buy.addImageString(UUID.randomUUID().toString() + "_" + "image1.jpg");
            buy.addImageString(UUID.randomUUID().toString() + "_" + "image2.jpg");
            buyRepository.save(buy);
            log.info("-----------------------------------------------");
            j++;
        }
    }
}
