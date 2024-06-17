package com.mlp.lab.repository.like;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.mlp.lab.entity.like.LikeBuy;

public interface LikeBuyRepository extends JpaRepository<LikeBuy, Long>{
    @Query("select lb from LikeBuy lb where buyNo=:buyNo and id=:id")
    Optional<LikeBuy> findLike(Long buyNo, Long id);
}
