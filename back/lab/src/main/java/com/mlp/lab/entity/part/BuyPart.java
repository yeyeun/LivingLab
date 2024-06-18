package com.mlp.lab.entity.part;

import com.mlp.lab.entity.Buy;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "teamNo")
@Table(name = "buy_part", indexes = { @Index(name = "idx_buy_buyNo", columnList = "buy_buyNo") })
// 공동구매 참여목록 테이블
public class BuyPart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pno; // 참여목록 번호

  @OneToOne
  @JoinColumn(name = "buy_buyNo") // buy_no
  private Buy buy; // 공동구매 테이블과 조인 (게시물 번호)

}
// 참가인원 목록