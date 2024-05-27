package com.mlp.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String>{
    //email/pwd 찾는 메서드
    public boolean existsByEmailAndPwd(String email, String pwd);
}
