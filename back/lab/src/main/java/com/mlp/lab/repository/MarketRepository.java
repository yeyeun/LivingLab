package com.mlp.lab.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.Market;

//Market Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface MarketRepository extends JpaRepository<Market,Integer>{

}
