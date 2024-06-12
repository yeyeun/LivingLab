package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.UserDto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Builder
@Getter
@Setter

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
    private String pwdCheck;
    private String name;
    private String addr;
    private String detailAddr;
    private String location; // 실시간 위치 정보
    private String phone;
    private String nickname;
    private String profileImage; // 프로필 사진
    private boolean social;

    @Enumerated(EnumType.STRING)
    private UserRole role; // 역할 부여

    ////////////////////////////////////////////////////////////////////////////
    // 스프링 시큐리티 쓸 때 활용
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<UserRole> userRoleList = new ArrayList<>();

    // 새로운 회원의 권한을 추가
    public void addRole(UserRole userRole) {
        userRoleList.add(userRole);
    }

    // 회원이 가진 권한 삭제
    public void clearRole() {
        userRoleList.clear();
    }

    // 소셜 권한 바꿀 때 사용 (스프링 시큐리티)
    public void changeSocial(boolean social) {
        this.social = social;
    }

    /////////////////////////////////////////////////////////////////////////////
    // static으로 만들어 클래스를 만들지 않아도 사용가능
    // 화면에서 받은 dto를 entity로
    public static User DtoToEntity(UserDto userDto) {
        ModelMapper modelMapper = new ModelMapper();
        User user = modelMapper.map(userDto, User.class);
        return user;
    }

    public static UserDto entityToDto(User user) {
        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(user, UserDto.class);
        return userDto;
    }

    // static으로 만들어 클래스를 만들지 않아도 사용가능
    // 화면에서 dto를 통해 받은 값과 Entity를 통해 DB에 저장할 값을 지정
    public static User createMember(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setPwd(dto.getPwd());
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setAddr(dto.getAddr());
        user.setDetailAddr(dto.getDetailAddr());
        user.setNickname(dto.getNickname());
        user.setRole(UserRole.USER);
        return user;
    }

    ////////////////////////////////////////////////////////////////////////////
    // 스프링 시큐리티 쓸 때 활용
    // @ElementCollection(fetch = FetchType.LAZY)
    // @Builder.Default
    // private List<UserRole> userRoleList = new ArrayList<>();

    // // 새로운 회원의 권한을 추가
    // public void addRole(UserRole userRole) {
    // userRoleList.add(userRole);
    // }

    // // 회원이 가진 권한 삭제
    // public void clearRole() {
    // userRoleList.clear();
    // }

    // // 소셜 권한 바꿀 때 사용 (스프링 시큐리티)
    // public void changeSocial(boolean social) {
    // this.social = social;
    // }
}
