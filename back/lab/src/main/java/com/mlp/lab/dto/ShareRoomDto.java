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
public class ShareRoomDto { // 화면에서 받을 데이터
    private Integer roomNo;
    private String email;
    private String nickname;
    private String title;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime regDate;
    private Integer monthlyRent;
    private boolean parking;
    private String location;
    private String option1;
    private boolean bookmark;



}