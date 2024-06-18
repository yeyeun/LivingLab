package com.mlp.lab.entity.part;

import com.mlp.lab.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = { "buypart" })
@Table(name = "buy_partuser", indexes = { @Index(name = "idx_buy_partuser_part", columnList = "buy_part_pno") })

// 공동구매 참여하는 회원테이블
public class BuyPartUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pino; // 참여회원 번호

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user; // user테이블과 조인 (회원)

  @ManyToOne
  @JoinColumn(name = "buy_part_pno")
  private BuyPart buypart; // buy_part테이블과 조인 (공동구매)

}
