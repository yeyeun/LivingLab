package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.MarketDto;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder //빌터 패턴으로 객체 생성
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "market")
@ToString(exclude = "imageList")
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
    private String nickname;
    private boolean flag;

    @ElementCollection
    @Builder.Default
    private List<MarketImage> imageList = new ArrayList<>();

    public void addImage(MarketImage image) { // 이미지 추가
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) { // 파일 추가
        MarketImage productImage = MarketImage.builder().fileName(fileName).build();
        addImage(productImage);
    }

    public void clearList() {
        this.imageList.clear();
    }

    public static Market DtoToEntity(MarketDto marketDto) { // 화면에서 받은 dto를 entity로
        ModelMapper modelMapper = new ModelMapper();
        Market market = modelMapper.map(marketDto, Market.class);

        // 업로드 처리가 끝난 파일들의 이름
        List<String> uploadFileNames = marketDto.getUploadFileNames();
        if (uploadFileNames == null) {
            return market;
        }
        uploadFileNames.stream().forEach(uploadName -> {
            market.addImageString(uploadName);
        });

        return market;
    }

    public static MarketDto entityToDto(Market market) {
        ModelMapper modelMapper = new ModelMapper();
        MarketDto marketDto = modelMapper.map(market, MarketDto.class);

        List<MarketImage> imageList = market.getImageList();
        if (imageList == null || imageList.size() == 0) {
            return marketDto;
        }
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        marketDto.setUploadFileNames(fileNameList);
        return marketDto;
    }

}
