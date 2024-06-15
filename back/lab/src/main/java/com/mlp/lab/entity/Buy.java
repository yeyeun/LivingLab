package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.entity.like.LikeBuy;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "buy")
@ToString(exclude = "imageList")
public class Buy extends BaseTimeEntity{
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
    private String nickname;
    private boolean flag; // true: 마감 / false:모집중

    @ElementCollection
    @Builder.Default
    private List<BuyImage> imageList = new ArrayList<>();

    @OneToMany(mappedBy = "buy")
    private List<LikeBuy> likeBuys;

    public void addImage(BuyImage image) { // 이미지 추가
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) { // 파일 추가
        BuyImage temaImage = BuyImage.builder().fileName(fileName).build();
        addImage(temaImage);
    }

    public void clearList() {
        this.imageList.clear();
    }

    public static Buy DtoToEntity(BuyDto buyDto) { // 화면에서 받은 dto를 entity로
        ModelMapper modelMapper = new ModelMapper();
        Buy buy = modelMapper.map(buyDto, Buy.class);

        // 업로드 처리가 끝난 파일들의 이름
        List<String> uploadFileNames = buyDto.getUploadFileNames();
        if (uploadFileNames == null) {
            return buy;
        }
        uploadFileNames.stream().forEach(uploadName -> {
            buy.addImageString(uploadName);
        });

        return buy;
    }

    public static BuyDto entityToDto(Buy buy) {
        ModelMapper modelMapper = new ModelMapper();
        BuyDto buyDto = modelMapper.map(buy, BuyDto.class);

        List<BuyImage> imageList = buy.getImageList();
        if (imageList == null || imageList.size() == 0) {
            return buyDto;
        }
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        buyDto.setUploadFileNames(fileNameList);
        return buyDto;
    }
}
