package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import com.mlp.lab.dto.UserDto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user") // db 테이블명과 맞춰야함
@ToString(exclude = "userRoleList")
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
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setPwd(dto.getPwd());
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setAddr(dto.getAddr());
        user.setNickname(dto.getNickname());
        return user;
    }

    // 스프링 시큐리티 쓸 때 활용
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<UserRole> userRoleList = new ArrayList<>();

    // 스프링 시큐리티 쓸 때 활용
    public void addRole(UserRole userRole) {
        userRoleList.add(userRole); // 새로운 회원의 권한을 추가
    }

    // 스프링 시큐리티 쓸 때 활용
    public void userRole() {
        userRoleList.clear(); // 회원이 가진 권한 삭제
    }

    // 회원정보 수정 (5개 함수)
    public void changeName(String name) {
        this.name = name;
    }

    public void changePhone(String phone) {
        this.phone = phone;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changePwd(String pwd) {
        this.pwd = pwd;
    }

    public void changeAddr(String addr) {
        this.addr = addr;
    }
    ///////////////////////////////////////

    // 소셜 권한 바꿀 때 사용 (스프링 시큐리티)
    // public void changeSocial(boolean social) {
    // this.social = social;
    // }
}
