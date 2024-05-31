package com.mlp.lab.entity;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.MarketDto;
import com.mlp.lab.dto.TeamDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder //빌터 패턴으로 객체 생성
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "team")
public class Team extends BaseEntity{
    @Id //기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamNo;
    private String user_id;
    private String title;
    private String content;
    private String deadline;
    private Character teamCategory;
    private Integer max;
    private Integer current;
    private String location;
    private Character teamHit;
    private String teamImage;

    public static Team createBuy(TeamDto teamDto){
        ModelMapper modelMapper = new ModelMapper();
        Team team = modelMapper.map(teamDto, Team.class);
        return team;
    }
}
