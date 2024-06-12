package com.mlp.lab.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.UserDto;
import com.mlp.lab.dto.LoginDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.entity.User;
import com.mlp.lab.service.MailService;
import com.mlp.lab.service.UserService;
import com.mlp.lab.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequestMapping("/api/user")
@RequiredArgsConstructor // 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
public class UserController {
    // final을 붙여 생성자 생성(@Autoweird 대신)
    private final UserService userService;
    private final MailService mailService;
    private final CustomFileUtil fileUtil;

    @PostMapping("/login")
    @ResponseBody
    public User login(@RequestBody LoginDto loginDto) {
        User user = userService.findByEmail(loginDto.getEmail());
        if (user == null || (!user.getPwd().equals(loginDto.getPwd()))) {
            return null;
        }
        User responseUser = new User();
        responseUser.setEmail(user.getEmail());
        responseUser.setAddr(user.getAddr());
        responseUser.setDetailAddr(user.getDetailAddr());
        responseUser.setNickname(user.getNickname());
        return responseUser; // ResponseDto에 메세지와 데이터를 담아서 화면(리액트)로 전달
    }

    @PostMapping("/join")
    public ResponseDto<Object> join(@RequestBody UserDto userDto) {
        if (userService.findByEmail(userDto.getEmail()) != null) {
            return ResponseDto.setFailed("이미 존재하는 아이디입니다.");
        }

        if (!userDto.getPwd().equals(userDto.getPwdCheck())) {
            return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
        }

        userService.add(userDto);

        return ResponseDto.setSuccess("회원가입 완료");
    }

    @PostMapping("/findId")
    public ResponseDto<Object> findId(@RequestBody UserDto userDto) {
        User user = userService.findId(userDto.getName(), userDto.getPhone());
        return ResponseDto.setSuccess(user.getName() + "님의 아이디는 " + user.getEmail() + " 입니다.");
    }

    @PostMapping("/findPwd")
    public ResponseDto<Object> findPwd(@RequestParam int inputAuthNum, @RequestBody User user) {
        int authNumber = mailService.makeRandomNumber();
        System.out.println("인증번호: " + authNumber);
        System.out.println("입력받은 인증번호: " + authNumber);

        if (authNumber != inputAuthNum) {
            return ResponseDto.setFailed("인증번호가 일치하지 않습니다.");
        }
        return ResponseDto.setSuccess(user.getName() + "님의 패스워드는 " + user.getPwd() + " 입니다.");
    }

    // 회원정보 수정
    @PutMapping("/modify")
    public Map<String, String> modifyUser(@RequestBody UserDto userDto) {
        log.info("---------------------userInfo modify-------------------");
        userService.modifyUserInfo(userDto);
        return Map.of("result", "userInfo modified");
    }

    // 회원정보 조회
    @GetMapping("/{id}")
    public UserDto get(@PathVariable(name = "id") Long id) {
        return userService.get(id);
    }

}