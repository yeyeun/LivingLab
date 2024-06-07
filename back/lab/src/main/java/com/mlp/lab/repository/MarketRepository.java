package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Market;

//Market Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface MarketRepository extends JpaRepository<Market,Integer>{
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false")
    Page<Object[]> selectList(Pageable pageable);
}
