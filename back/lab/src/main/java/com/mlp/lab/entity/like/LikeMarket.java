package com.mlp.lab.entity.like;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mlp.lab.entity.Market;
import com.mlp.lab.entity.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "likemarket")
public class LikeMarket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "market_marketNo")
    @JsonBackReference
    private Market market;
    
}
