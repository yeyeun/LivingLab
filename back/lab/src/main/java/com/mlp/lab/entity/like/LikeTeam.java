package com.mlp.lab.entity.like;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mlp.lab.entity.Team;
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
@Table(name = "liketeam")
public class LikeTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_teamNo")
    @JsonBackReference
    private Team team;
    
}
