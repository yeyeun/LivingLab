package com.mlp.lab.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
// @AllArgsConstructor
public class PartUserListDto {

  private Long pino; // 참여 회원고유번호 // cino

  private String nickname; // 참여회원 닉네임 (pname)

  private String email;

  private String profileImage;

  public PartUserListDto(Long pino, String nickname, String email, String profileImage) {
    this.pino = pino;
    this.nickname = nickname;
    this.email = email;
    this.profileImage = profileImage;
  }
}
