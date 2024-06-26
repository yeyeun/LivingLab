package com.mlp.lab.repository.like;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mlp.lab.entity.like.LikeMarket;

@Repository
public interface LikeMarketRepository extends JpaRepository<LikeMarket, Long>{
    @Query("select lm from LikeMarket lm where lm.market.marketNo=:marketNo and lm.user.id=:id")
    Optional<LikeMarket> findLike(@Param("marketNo")Long marketNo, @Param("id") Long id);
    
    @Modifying
    @Query("delete from LikeMarket lm where lm.market.marketNo=:marketNo")
    void deleteLike(@Param("marketNo")Long marketNo);
}
