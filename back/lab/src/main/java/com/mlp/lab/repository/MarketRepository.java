package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mlp.lab.entity.Market;

//Market Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface MarketRepository extends JpaRepository<Market,Integer>{
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false")
    Page<Object[]> selectList(Pageable pageable);

    // 검색어 기준 정렬
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false and m.title like %:title%")
    Page<Object[]> selectSearchList(String title, Pageable pageable);

    // 최신순
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false order by m.createdDate desc")
    Page<Object[]> newList(Pageable pageable);

    // 마감임박순
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false order by m.deadline asc")
    Page<Object[]> deadLineList(Pageable pageable);

    // 검색 + 최신순
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false and m.title like %:title% order by m.createdDate desc")
    Page<Object[]> searchNewList(String title, Pageable pageable);

    // 검색 + 마감임박순
    @Query("select m, mi from Market m left join m.imageList mi where mi.ord = 0 and m.flag = false and m.title like %:title% order by m.deadline asc")
    Page<Object[]> searchDeadLineList(String title, Pageable pageable);
}
