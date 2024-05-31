package com.mlp.lab.entity;

import com.mlp.lab.dto.UserDto;

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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user") // db 테이블명과 맞춰야함
public class User {
    @Id // 기본키(PK) 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String pwd;
    private String name;
    private String addr;
    private String phone;
    private String nickname;
    private String profileImage;

    // static으로 만들어 클래스를 만들지 않아도 사용가능
    public static User createMember(UserDto dto) { // 화면에서 dto를 통해 받은 값과 Entity를 통해 DB에 저장할 값을 지정
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPwd(dto.getPwd());
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setAddr(dto.getAddr());
        user.setNickname(dto.getNickname());
        return user;
    }
}
