package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.UserDto;
import com.mlp.lab.dto.LoginDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.entity.User;
import com.mlp.lab.service.MailService;
import com.mlp.lab.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor // 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
public class UserController {
    // 리액트와 연동시 보통 rest api를 통해 프론트로 json 형태의 데이터를 넘겨주기 때문에 이런 식으로 데이터를 return 하는 것이 좋음
    // REST API로 만든다면 클라이언트와 서버 간의 통신 가능

    // final을 붙여 생성자 생성(@Autoweird 대신)
    private final UserService userService;
    private final MailService mailService;

    @PostMapping("/login")
    public ResponseDto<?> login(@RequestBody LoginDto loginDto) {
        User user = userService.findByEmail(loginDto.getEmail());
        if (user == null || (!user.getPwd().equals(loginDto.getPwd()))) {
            return ResponseDto.setFailed("아이디와 비밀번호를 확인해주세요.");
        }
        return ResponseDto.setSuccess("환영합니다 " + loginDto.getEmail() + " 님");  //ResponseDto에 메세지와 데이터를 담아서 화면(리액트)로 전달
    }

    @PostMapping("/join")
    public ResponseDto<?> join(@RequestBody UserDto userDto) {
        if (userService.findByEmail(userDto.getEmail()) != null) {
            return ResponseDto.setFailed("이미 존재하는 아이디입니다.");
        }
        if(!userDto.getPwd().equals(userDto.getPwdCheck())){
            return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
        }
        User user = User.createMember(userDto);  // 화면에서 받은 데이터를 담은 Dto를 Entity에 담아 DB에 저장
        userService.save(user);
        return ResponseDto.setSuccess("회원가입 완료");
    }

    @PostMapping("/findId")
    public ResponseDto<String> findId(@RequestBody UserDto userDto) {
        User user = userService.findId(userDto.getName(), userDto.getPhone());
        return ResponseDto.setSuccess(user.getName() + "님의 아이디는 " + user.getEmail() + " 입니다.");
    }

    @PostMapping("/findPwd")
    public ResponseDto<String> findPwd(@RequestParam int inputAuthNum, @RequestBody User user) {
        int authNumber = mailService.makeRandomNumber();
        System.out.println("인증번호: " +authNumber);
        System.out.println("입력받은 인증번호: " +authNumber);

        if(authNumber != inputAuthNum){
            return ResponseDto.setFailed("인증번호가 일치하지 않습니다.");
        }
        return ResponseDto.setSuccess(user.getName() + "님의 패스워드는 " + user.getPwd() + " 입니다.");
    }
}