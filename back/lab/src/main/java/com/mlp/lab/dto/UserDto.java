package com.mlp.lab.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto { // 마이페이지 화면에서 받을 데이터
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

    private static List<String> roleNames = new ArrayList<>();

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
        dataMap.put("detailAddr", detailAddr);
        dataMap.put("profileImage", profileImage);
        dataMap.put("location", location);
        dataMap.put("social", social);
        dataMap.put("roleNames", roleNames);

        return dataMap;
    }

}
