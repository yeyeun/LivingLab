package com.mlp.lab.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

// 시큐리티가 사용하는 타입에 맞춰서 만든 Dto
public class MemberDto extends User {

  private Long id;
  private String email;
  private String pwd;
  private String pwdCheck;
  private String name;
  private String phone;
  private String nickname;
  private String addr;
  private String detailAddr;
  private String profileImage; // 프로필 사진
  private String location; // 실시간 위치정보 추가
  private boolean social;

  private List<String> roleNames = new ArrayList<>();

  // 시큐리티가 사용하는 타입에 맞춰서 dto를 만들었다.
  // dto가 생성자가 있는데 시큐리티는 객체로 권한을 가져야한다. (SimpleGrantedAuthority)
  // (SimpleGrantedAuthority) : 문자열로 권한을 맞춰줌
  public MemberDto(String email, String pwd, String name, String phone, String nickname,
      String addr, boolean social, List<String> roleNames) {

    super(
        email,
        pwd,
        roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));

    // this.id = id;
    this.email = email;
    this.pwd = pwd;
    // this.pwdCheck = pwdCheck;
    this.name = name;
    this.phone = phone;
    this.nickname = nickname;
    this.addr = addr;
    this.social = social;
    this.roleNames = roleNames;
  }

  // JWT 문자열을 만들떄는 데이터가 필요하다
  // 필요한 데이터를 바꿔주는 처리를 위해서
  // claims(JWT 문자열 내용)을 만들어주는 기능
  public Map<String, Object> getClaims() {
    Map<String, Object> dataMap = new HashMap<>();

    dataMap.put("id", id);
    dataMap.put("email", email);
    dataMap.put("pwd", pwd);
    dataMap.put("pwdCheck", pwdCheck);
    dataMap.put("name", name);
    dataMap.put("phone", phone);
    dataMap.put("nickname", nickname);
    dataMap.put("addr", addr);
    dataMap.put("social", social);
    dataMap.put("roleNames", roleNames);

    return dataMap;
  }
}
