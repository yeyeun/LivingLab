package com.mlp.lab.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MarketDto { // 동네장터 화면에서 받을 데이터
    private Integer marketNo;
    private String user_id;
    private String title;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime regDate;
    private String deadline;
    private Character marketCategory;
    private Integer max;
    private Integer current;
    private String location;
    private Character marketHit;
    private String marketImage;
}