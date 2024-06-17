package com.mlp.lab.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "teamNo")
@Table(name = "part", indexes = { @Index(name = "idx_team_teamNo", columnList = "team_teamNo") })
// 동네모임 참여목록 테이블
public class Part {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pno; // 참여목록 번호

  @OneToOne
  @JoinColumn(name = "team_teamNo") // team_no
  private Team team; // 동네모임 테이블과 조인 (게시물 번호)
}
// 참가인원 목록