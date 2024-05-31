package com.mlp.lab.entity;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.MarketDto;

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
@Table(name = "market")
public class Market extends BaseEntity{
    @Id //기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long marketNo;
    private String user_id;
    private String title;
    private String content;
    private String deadline;
    private Character marketCategory;
    private Integer max;
    private Integer current;
    private String location;
    private Character marketHit;
    private String marketImage;

    public static Market createBuy(MarketDto marketDto){
        ModelMapper modelMapper = new ModelMapper();
        Market market = modelMapper.map(marketDto, Market.class);
        return market;
    }
}
