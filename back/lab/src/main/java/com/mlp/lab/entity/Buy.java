package com.mlp.lab.entity;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.UserDto;

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
@Table(name = "buy")
public class Buy extends BaseEntity{
    @Id //기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyNo;
    private String user_id;
    private String title;
    private String content;
    private String deadline;
    private Character buyCategory;
    private Integer max;
    private Integer current;
    private String location;
    private Character buyHit;
    private String buyImage;

    public static Buy createBuy(BuyDto buyDto){
        ModelMapper modelMapper = new ModelMapper();
        Buy buy = modelMapper.map(buyDto, Buy.class);
        return buy;
    }
}
