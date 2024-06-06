package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Community;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface CommunityRepository extends JpaRepository<Community, Integer> {

    //JPQL을 이용해서 쿼리를 작성하고, 조인 처리
    //커뮤니티 관련 글의 내용과 이미지를 가져옴(이미지가 삭제되지않은)
    @Query("select c, ci from Community c left join c.imageList ci where ci.ord = 0 and c.flag = false")
    Page<Object[]> selectList(org.springframework.data.domain.Pageable pageable);

}
