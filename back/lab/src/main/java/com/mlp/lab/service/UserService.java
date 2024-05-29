package com.mlp.lab.service;


import org.springframework.stereotype.Service;


import com.mlp.lab.entity.User;
import com.mlp.lab.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    //final 붙여야지 생성자 만들어줌(RequiredArgsConstructor)
    private final UserRepository userRepository;

    public void save(User member){  
        userRepository.save(member);
    }

    public User findByEmail(String email){    
        return userRepository.findByEmail(email);
    }
    
    public User findId(String name, String phone){
        return userRepository.findByNameAndPhone(name, phone);
    }
}
