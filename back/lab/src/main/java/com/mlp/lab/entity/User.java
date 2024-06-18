package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.UserDto;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
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
    @Id //기본키(PK) 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "pwd", length = 100)
    private String pwd;
    private String name;

    @Column(name = "addr")
    private String addr;

    @Column(name = "detail_addr")
    private String detailAddr;

    @Column(name = "location")
    private String location; // 실시간 위치 정보

    @Column(name = "phone")
    private String phone;

    @Column(name = "nickname")
    private String nickname;
    private String profileImage;

    // static으로 만들어 클래스를 만들지 않아도 사용가능
    public static User DtoToEntity(UserDto userDto) { // 화면에서 받은 dto를 entity로
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
    // public static User createMember(UserDto dto) { // 화면에서 dto를 통해 받은 값과 Entity를
    // 통해 DB에 저장할 값을 지정
    // User user = new User();
    // user.setId(dto.getId());
    // user.setEmail(dto.getEmail());
    // user.setPwd(dto.getPwd());
    // user.setName(dto.getName());
    // user.setPhone(dto.getPhone());
    // user.setAddr(dto.getAddr());
    // user.setDetailAddr(dto.getDetailAddr());
    // user.setNickname(dto.getNickname());
    // return user;
    // }

    ////////////////////////////////////////////////////////////////////////////
    // 스프링 시큐리티 쓸 때 활용
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<UserRole> userRoleList = new ArrayList<>();

    // 스프링 시큐리티 쓸 때 활용
    // 새로운 회원의 권한을 추가
    public void addRole(UserRole userRole) {
        userRoleList.add(userRole);
    }

    // 스프링 시큐리티 쓸 때 활용
    // 회원이 가진 권한 삭제
    public void userRole() {
        userRoleList.clear();
    }

    // 소셜 권한 바꿀 때 사용 (스프링 시큐리티)
    // public void changeSocial(boolean social) {
    // this.social = social;
    // }
}
