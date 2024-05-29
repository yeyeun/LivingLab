package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.UserDto;
import com.mlp.lab.entity.User;
import com.mlp.lab.service.MailService;
import com.mlp.lab.service.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;
    private final UserService userService;

    @GetMapping("/send")
    @ResponseBody //@ResponseBody: 자바 객체를 json 기반의 HTTP Body로 변환
    public void findPwd(@RequestBody UserDto userDto) {
        User user = userService.findByEmail(userDto.getEmail());
        System.out.println("이메일 인증 요청");
        System.out.println("이메일 인증 이메일 : " + user.getEmail());
        String authNumber = mailService.joinEmail(user, user.getEmail());
    }
}
