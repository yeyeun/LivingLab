package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Community;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface CommunityRepository extends JpaRepository<Community, Integer> {

    @Query("select c from Community c where c.type = '1'")
    Page<Community> tipList(Pageable pageable);

    @Query("select c from Community c where c.type = '1' and c.title like %:title%")
    Page<Community> tipSearchList(Pageable pageable, String title);

    @Query("select c from Community c where c.type = '1' and c.commCategory = :category")
    Page<Community> tipSelectList(Pageable pageable, Character category);

    @Query("select c from Community c where c.type = '1' and c.commCategory = :category and c.title like %:title% ")
    Page<Community> tipSearchSelectList(Pageable pageable, String title, Character category);

    @Query("select c from Community c where c.type = '2'")
    Page<Community> qnaList(Pageable pageable);

    @Query("select c from Community c where c.type = '2' and c.title like %:title%")
    Page<Community> qnaSearchList(Pageable pageable, String title);

    @Query("select c from Community c where c.type = '2' and c.commCategory = :category")
    Page<Community> qnaSelectList(Pageable pageable, Character category);

    @Query("select c from Community c where c.type = '2' and c.commCategory = :category and c.title like %:title%")
    Page<Community> qnaSearchSelectList(Pageable pageable, String title, Character category);

    @Query("select c from Community c where c.type = '3'")
    Page<Community> reviewList(Pageable pageable);

    @Query("select c from Community c where c.type = '3' and c.title like %:title%")
    Page<Community> reviewSearchList(Pageable pageable, String title);

    @Query("select c from Community c where c.type = '3' and c.commCategory = :category")
    Page<Community> reviewSelectList(Pageable pageable, Character category);

    @Query("select c from Community c where c.type = '3' and c.commCategory = :category and c.title like %:title%")
    Page<Community> reviewSearchSelectList(Pageable pageable, String title, Character category);

    @Query("select c from Community c where c.type = '4'")
    Page<Community> selectHelpList(Pageable pageable);

    @Query("select c from Community c where c.type = '4' and c.title like %:title%")
    Page<Community> helpSearchList(Pageable pageable, String title);
}
