package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Team;

//Team Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface TeamRepository extends JpaRepository<Team,Integer>{
    @Query("select t, ti from Team t left join t.imageList ti where ti.ord = 0 and t.flag = false")
    Page<Object[]> selectList(Pageable pageable);
}
