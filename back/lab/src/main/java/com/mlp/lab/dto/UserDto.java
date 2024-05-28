package com.mlp.lab.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {    //화면에서 받을 데이터
    private String email;
    private String pwd;
    private String pwdCheck;
    private String name;
    private String phone;
    private String nickname;
    private String addr;
    private String birth;
}
