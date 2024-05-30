package com.mlp.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.Buy;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface BuyRepository extends JpaRepository<Buy,Integer>{

}
