package com.mlp.lab.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.entity.Community;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface CommunityRepository extends JpaRepository<Community, Integer> {

    @Query("select c from Community c where c.type = '1' order by c.commNo desc")
    Page<Community> tipList(Pageable pageable);

    @Query("select c from Community c where c.type = '1' and c.title like %:title%")
    Page<Community> tipSearchList(Pageable pageable,@Param(value="title") String title);

    @Query("select c from Community c where c.type = '1' and c.commCategory = :category")
    Page<Community> tipSelectList(Pageable pageable,@Param(value="category") Character category);

    @Query("select c from Community c where c.type = '1' and c.commCategory = :category and c.title like %:title% ")
    Page<Community> tipSearchSelectList(Pageable pageable,@Param(value="title") String title, @Param(value="category") Character category);

    @Query("select c from Community c where c.type = '2' order by c.commNo desc")
    Page<Community> qnaList(Pageable pageable);

    @Query("select c from Community c where c.type = '2' and c.title like %:title%")
    Page<Community> qnaSearchList(Pageable pageable,@Param(value="title") String title);

    @Query("select c from Community c where c.type = '2' and c.commCategory = :category")
    Page<Community> qnaSelectList(Pageable pageable,@Param(value="category") Character category);

    @Query("select c from Community c where c.type = '2' and c.commCategory = :category and c.title like %:title%")
    Page<Community> qnaSearchSelectList(Pageable pageable,@Param(value="title") String title,@Param(value="category") Character category);

    @Query("select c from Community c where c.type = '3' order by c.commNo desc")
    Page<Community> reviewList(Pageable pageable);

    @Query("select c from Community c where c.type = '3' and c.title like %:title%")
    Page<Community> reviewSearchList(Pageable pageable,@Param(value="title") String title);

    @Query("select c from Community c where c.type = '3' and c.commCategory = :category")
    Page<Community> reviewSelectList(Pageable pageable,@Param(value="category") Character category);

    @Query("select c from Community c where c.type = '3' and c.commCategory = :category and c.title like %:title%")
    Page<Community> reviewSearchSelectList(Pageable pageable,@Param(value="title") String title,@Param(value="category") Character category);

    @Query("select c from Community c where c.type = '4' order by c.commNo desc")
    Page<Community> selectHelpList(Pageable pageable);

    @Query("select c from Community c where c.type = '4' and c.title like %:title%")
    Page<Community> helpSearchList(Pageable pageable,@Param(value="title") String title);

    @Query("select c from Community c order by c.createdDate desc")
    List<Community> latestCommList();
}

