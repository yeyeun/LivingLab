package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.entity.Team;

//Team Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface TeamRepository extends JpaRepository<Team, Integer> {
    Team findTeamByTeamNo(@Param(value = "teamNo")Long teamNo);

    Team findByTeamNo(@Param(value = "teamNo")Long teamNo);

    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) order by t.teamNo desc")
    Page<Object[]> selectList(Pageable pageable);

    // 검색어 기준 정렬(글 제목에서만 검색)
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.title like %:title%")
    Page<Object[]> selectSearchList(@Param(value = "title") String title, Pageable pageable);

    // 최신순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) order by t.teamNo")
    Page<Object[]> newList(Pageable pageable);

    // 마감임박순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) order by t.deadline asc")
    Page<Object[]> deadLineList(Pageable pageable);

    // 검색 + 최신순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.title like %:title% order by t.teamNo")
    Page<Object[]> searchNewList(@Param(value = "title") String title, Pageable pageable);

    // 검색 + 마감임박순
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.title like %:title% order by t.deadline asc")
    Page<Object[]> searchDeadLineList(@Param(value = "title") String title, Pageable pageable);

    // 메인에 표기할 최신순
    @Query("select t, ti from Team t left join t.imageList ti where ti.ord = 0 and t.flag = false order by t.teamNo desc")
    Page<Object[]> latestTeamList(Pageable pageable);

    // 카테고리
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.teamCategory = :category order by t.teamNo desc")
    Page<Object[]> selectCategoryList(@Param("category") Character category, Pageable pageable);
    
    // 카테고리 + 검색
    @Query("select t, ti from Team t left join t.imageList ti where t.flag = false and (ti.ord = 0 or ti.ord IS NULL) and t.teamCategory = :category and t.title like %:title% order by t.teamNo desc")
    Page<Object[]> selectCategorySearchList(@Param("category") Character category, @Param("title") String title, Pageable pageable);

    //마이페이지 내가 작성한 글
    @Query("SELECT t FROM Team t WHERE t.user.id = :id ORDER BY t.teamNo DESC")
    Page<Team> findByUser(@Param(value = "id") Long id, Pageable pageable);
}
