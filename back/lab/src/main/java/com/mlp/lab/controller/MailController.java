package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
    public String mailSend(@RequestParam String email) {
        User user = userService.findByEmail(email);    //입력받은 이메일로 유저정보 가져오기
        System.out.println("이메일 인증 요청");
        System.out.println("이메일 인증 이메일 : " + user.getEmail());
        String authNum = mailService.joinEmail(user, user.getEmail());   //해당 유저의 이메일로 인증메일 발송
        return authNum; //인증번호 리턴
    }
}
