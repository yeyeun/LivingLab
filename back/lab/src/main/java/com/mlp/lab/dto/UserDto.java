package com.mlp.lab.dto;

import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto { // 화면에서 받을 데이터
    private Long id;
    private String email;
    private String pwd;
    // private String pwdCheck;
    private String name;
    private String phone;
    private String nickname;
    private String addr;

    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("id", id);
        dataMap.put("email", email);
        dataMap.put("pwd", pwd);
        // dataMap.put("pwdCheck", pwdCheck);
        dataMap.put("name", name);
        dataMap.put("phone", phone);
        dataMap.put("nickname", nickname);
        dataMap.put("addr", addr);
        // dataMap.put("social", social);
        // dataMap.put("roleNames", roleNames);

        return dataMap;
    }
}
