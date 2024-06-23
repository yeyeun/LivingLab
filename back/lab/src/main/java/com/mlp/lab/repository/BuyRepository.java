package com.mlp.lab.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mlp.lab.entity.Buy;

//Buy Entity의 기본키(PK) 타입인 Integer를 인자로 전달
public interface BuyRepository extends JpaRepository<Buy, Integer> {
    Buy findBuyByBuyNo(@Param(value = "buyNo") Long buyNo);

    Buy findByBuyNo(@Param(value = "buyNo") Long buyNo);

    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) order by b.createdDate desc")
    Page<Object[]> selectList(Pageable pageable);

    // 검색어 기준 정렬(글 제목에서만 검색)
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) and b.title like %:title%")
    Page<Object[]> selectSearchList(@Param(value = "title") String title, Pageable pageable);

    // 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) order by b.buyNo desc")
    Page<Object[]> newList(Pageable pageable);

    // 마감임박순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) order by b.deadline asc")
    Page<Object[]> deadLineList(Pageable pageable);

    // 거리순
    @Query("SELECT b, bi, " +
            "(6371 * FUNCTION('acos', FUNCTION('cos', FUNCTION('radians', :latitude)) " +
            "* FUNCTION('cos', FUNCTION('radians', b.latitude)) " +
            "* FUNCTION('cos', FUNCTION('radians', b.longitude) - FUNCTION('radians', :longitude)) " +
            "+ FUNCTION('sin', FUNCTION('radians', :latitude)) " +
            "* FUNCTION('sin', FUNCTION('radians', b.latitude)))) AS distance " +
            "FROM Buy b " +
            "LEFT JOIN b.imageList bi " +
            "JOIN User u " +
            "WHERE b.flag = false " +
            "AND (bi.ord = 0 OR bi.ord IS NULL) " +
            "HAVING distance < 2 " +
            "ORDER BY distance ASC")
    Page<Object[]> distanceList(
            @Param("latitude") double latitude,
            @Param("longitude") double longitude,
            Pageable pageable);

    // 검색 + 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) and b.title like %:title% order by b.buyNo")
    Page<Object[]> searchNewList(@Param(value = "title") String title, Pageable pageable);

    // 검색 + 마감임박순
    @Query("select b, bi from Buy b left join b.imageList bi where b.flag = false and (bi.ord = 0 or bi.ord IS NULL) and b.title like %:title% order by b.deadline asc")
    Page<Object[]> searchDeadLineList(@Param(value = "title") String title, Pageable pageable);

    // 메인에 표기할 최신순
    @Query("select b, bi from Buy b left join b.imageList bi where bi.ord = 0 and b.flag = false order by b.buyNo")
    Page<Object[]> latestBuyList(Pageable pageable);

}
