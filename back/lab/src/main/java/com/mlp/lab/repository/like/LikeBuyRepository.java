package com.mlp.lab.repository.like;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mlp.lab.entity.like.LikeBuy;

@Repository
public interface LikeBuyRepository extends JpaRepository<LikeBuy, Long>{
    @Query("select lb from LikeBuy lb where lb.buy.buyNo=:buyNo and lb.user.id=:id")
    Optional<LikeBuy> findLike(@Param("buyNo")Long buyNo, @Param("id") Long id);

    @Modifying
    @Query("delete from LikeBuy lb where lb.buy.buyNo=:buyNo")
    void deleteLike(@Param("buyNo")Long buyNo);
}
