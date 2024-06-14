package com.mlp.lab.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.Community;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface BuyRepository extends JpaRepository<Buy, Integer> {

    // JPQL을 이용해서 쿼리를 작성하고, 조인 처리
    // 공동구매관련 글의 내용과 이미지를 가져옴(이미지가 삭제되지않은)
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false")
    Page<Object[]> selectList(Pageable pageable);

    // 검색어 기준 정렬(글 제목에서만 검색)
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false and b.title like %:title% order by b.createdDate desc")
    Page<Object[]> selectSearchList(String title, Pageable pageable);

    // 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false order by b.createdDate desc")
    Page<Object[]> newList(Pageable pageable);

    // 마감임박순
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false order by b.deadline asc")
    Page<Object[]> deadLineList(Pageable pageable);

    // 검색 + 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false and b.title like %:title% order by b.createdDate desc")
    Page<Object[]> searchNewList(String title, Pageable pageable);

    // 검색 + 마감임박순
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false and b.title like %:title% order by b.deadline asc")
    Page<Object[]> searchDeadLineList(String title, Pageable pageable);

    // 메인에 표기할 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false order by b.createdDate desc")
    Page<Object[]> latestBuyList(Pageable pageable);
    
}
