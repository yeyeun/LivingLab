package com.mlp.lab.service;

import org.springframework.stereotype.Service;

import com.mlp.lab.entity.User;
import com.mlp.lab.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    //final 붙여야지 생성자 만들어줌(RequiredArgsConstructor)
    private final UserRepository memberRepository;

    public void save(User member){  //회원가입
        memberRepository.save(member);
    }

    public User findByEmail(String email){    //로그인
        return memberRepository.findByEmail(email);
    }
    
    public User findId(String name, String phone){
        return memberRepository.findByNameAndPhone(name, phone);
    }

}
