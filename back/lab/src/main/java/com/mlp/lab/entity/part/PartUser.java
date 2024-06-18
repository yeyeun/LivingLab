package com.mlp.lab.entity.part;

import com.mlp.lab.entity.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = { "part", "buypart" })
@Table(name = "team_partuser", indexes = { @Index(name = "idx_partuser_part", columnList = "part_pno") })

// 동네모임 참여하는 회원테이블
public class PartUser {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pino; // 참여회원 번호

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user; // user테이블과 조인 (회원)

  @ManyToOne
  @JoinColumn(name = "part_pno")
  private Part part; // team part테이블과 조인 (참여목록)

}
