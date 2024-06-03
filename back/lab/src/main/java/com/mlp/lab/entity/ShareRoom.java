package com.mlp.lab.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder //빌터 패턴으로 객체 생성
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "livingroom")
public class ShareRoom {
    @Id //기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomNo;
    private String email;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private Integer monthlyRent;
    private boolean parking;
    private String location;
    private String option1;
    private boolean bookmark;
}
