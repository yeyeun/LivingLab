package com.mlp.lab.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.UserDto;
import com.mlp.lab.entity.User;
import com.mlp.lab.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor // 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
public class UserController {
    // 리액트와 연동시 보통 rest api를 통해 프론트로 json 형태의 데이터를 넘겨주기 때문에 이런 식으로 데이터를 return 하는 것이 좋음

    // final을 붙여 생성자 생성(@Autoweird 대신)
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto userDto) {
        User user = userService.findByEmail(userDto.getEmail());

        if (user == null || (!user.getPwd().equals(userDto.getPwd()))) {
            return ResponseEntity.badRequest().body("아이디와 비밀번호를 확인해주세요.");
        }
        return ResponseEntity.ok("환영합니다 " + userDto.getEmail() + " 님");
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody UserDto userDto) {
        if (userService.findByEmail(userDto.getEmail()) != null) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }
        // 화면에서 받은 데이터를 담은 Dto를 Entity에 담아 DB에 저장
        User user = User.createMember(userDto);
        userService.save(user);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/findId")
    public ResponseEntity<String> findId(@RequestBody UserDto userDto) {
        User user = userService.findId(userDto.getName(), userDto.getPhone());
        return ResponseEntity.ok(user.getName() + "님의 아이디는 " + user.getEmail() + " 입니다.");
    }
}
