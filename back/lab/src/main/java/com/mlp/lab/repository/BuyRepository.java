package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Buy;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface BuyRepository extends JpaRepository<Buy, Integer> {
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL)")
    Page<Object[]> selectList(Pageable pageable);

    // 검색어 기준 정렬(글 제목에서만 검색)
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) and b.title like %:title%")
    Page<Object[]> selectSearchList(String title, Pageable pageable);

    // 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) order by b.createdDate desc")
    Page<Object[]> newList(Pageable pageable);

    // 마감임박순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) order by b.deadline asc")
    Page<Object[]> deadLineList(Pageable pageable);

    // 검색 + 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) and b.title like %:title% order by b.createdDate desc")
    Page<Object[]> searchNewList(String title, Pageable pageable);

    // 검색 + 마감임박순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) and b.title like %:title% order by b.deadline asc")
    Page<Object[]> searchDeadLineList(String title, Pageable pageable);
}
