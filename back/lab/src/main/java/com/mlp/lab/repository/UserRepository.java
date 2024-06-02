package com.mlp.lab.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.User;

import jakarta.transaction.Transactional;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // select * from user where email = ?, 이메일(아이디)로 유저 찾기

    User findUserByEmail(String email);

    User findByNameAndPhone(String name, String phone); // 이름과 번호로 이메일(아이디) 찾기

}
