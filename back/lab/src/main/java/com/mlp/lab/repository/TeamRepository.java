package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Team;

//Team Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface TeamRepository extends JpaRepository<Team, Integer> {
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL)")
    Page<Object[]> selectList(Pageable pageable);

    // 검색어 기준 정렬(글 제목에서만 검색)
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.title like %:title%")
    Page<Object[]> selectSearchList(String title, Pageable pageable);

    // 최신순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) order by t.createdDate desc")
    Page<Object[]> newList(Pageable pageable);

    // 마감임박순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) order by t.deadline asc")
    Page<Object[]> deadLineList(Pageable pageable);

    // 검색 + 최신순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.title like %:title% order by t.createdDate desc")
    Page<Object[]> searchNewList(String title, Pageable pageable);

    // 검색 + 마감임박순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.title like %:title% order by t.deadline asc")
    Page<Object[]> searchDeadLineList(String title, Pageable pageable);
}
