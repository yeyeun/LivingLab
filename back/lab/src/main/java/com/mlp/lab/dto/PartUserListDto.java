package com.mlp.lab.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
// @AllArgsConstructor
public class PartUserListDto {

  private Long pino; // 참여 회원고유번호 // cino

  private String nickname; // 참여회원 닉네임 (pname)

  public PartUserListDto(Long pino, String nickname) {
    this.pino = pino;
    this.nickname = nickname;
  }
}
