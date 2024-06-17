package com.mlp.lab.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartUserDto {
  // private String email; // 회원 이메일
  private String nickname; // 회원 닉네임
  private Long id; // 회원 고유번호(user_id)
  // private Long pno; // 참여목록 번호
  private Long pino; // 참여회원 번호

  private Long teamNo; // 동네모임 게시물 번호

}
