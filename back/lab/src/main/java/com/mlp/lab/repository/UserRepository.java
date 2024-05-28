package com.mlp.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email); // select * from user where email = ?, 이메일로 유저 찾기
    
    User findByNameAndPhone(String name,String phone); //이름과 번호로 이메일 찾기
}
