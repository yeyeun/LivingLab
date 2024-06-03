package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Buy;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface BuyRepository extends JpaRepository<Buy, Integer> {

    //JPQL을 이용해서 쿼리를 작성하고, 조인 처리
    //공동구매관련 글의 내용과 이미지를 가져옴(이미지가 삭제되지않은)
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false")
    Page<Object[]> selectList(org.springframework.data.domain.Pageable pageable);
}
