package com.mlp.lab.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinDto {
    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    private String email;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;
    
    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    //@Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요.")
    private String pwd; //비밀번호

    private String confirmPwd;  //비밀번호 확인
    private String phone;
    private String addr;
    private String birth;
    private String nickname;
}
