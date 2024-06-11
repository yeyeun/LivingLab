package com.mlp.lab.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.ShareRoom;


//ShareRoom Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface ShareRoomRepository extends JpaRepository<ShareRoom,Integer>{

    // JPQL을 이용해서 쿼리를 작성하고, 조인 처리
    // 글의 내용과 이미지를 가져옴(이미지가 삭제되지않은)
    @Query("select s, si from ShareRoom s left join s.imageList si where si.ord = 0 and s.flag = true")
    Page<Object[]> selectList(Pageable pageable);
}
