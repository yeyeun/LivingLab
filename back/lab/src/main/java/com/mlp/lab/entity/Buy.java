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
@Table(name = "buy")
public class Buy {
    @Id //기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer buyNo;
    private String user_id;
    private String title;
    private String content;
    private LocalDateTime regDate;
    private String deadline;
    private Character buyCategory;
    private Integer max;
    private Integer current;
    private String location;
    private Character buyHit;
    private String buyImage;
}
