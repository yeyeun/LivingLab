package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.BuyDto;
import com.mlp.lab.dto.CommunityDto;

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
@Builder // 빌터 패턴으로 객체 생성
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "community")
@ToString(exclude = "imageList")
public class Community extends BaseTimeEntity {
    /* 해당 글 작성자만 수정할수 있으므로 BaseEntity는 상속받지 않음
    생성일, 최근 수정일만 사용하도록 BaseTimeEntity만 상속 받음 */
    @Id // 기본키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commNo;
    private String user_id;
    private Character type;
    private String title;
    private String content;
    private Integer commHit;
    private Character commCategory; //0:기타, 1:부동산, 2:인테리어, 3:할인정보
    private String nickname;
    private boolean flag;

    @ElementCollection
    @Builder.Default
    private List<CommunityImage> imageList = new ArrayList<>();

    public void addImage(CommunityImage image) { // 이미지 추가
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) { // 파일 추가
        CommunityImage communityImage = CommunityImage.builder().fileName(fileName).build();
        addImage(communityImage);
    }

    public void clearList() {
        this.imageList.clear();
    }

    public static Community DtoToEntity(CommunityDto communityDto) { // 화면에서 받은 dto를 entity로
        ModelMapper modelMapper = new ModelMapper();
        Community community = modelMapper.map(communityDto, Community.class);

        // 업로드 처리가 끝난 파일들의 이름
        List<String> uploadFileNames = communityDto.getUploadFileNames();
        if (uploadFileNames == null) {
            return community;
        }
        uploadFileNames.stream().forEach(uploadName -> {
            community.addImageString(uploadName);
        });

        return community;
    }

    public static CommunityDto entityToDto(Community community) {
        ModelMapper modelMapper = new ModelMapper();
        CommunityDto communityDto = modelMapper.map(community, CommunityDto.class);

        List<CommunityImage> imageList = community.getImageList();
        if (imageList == null || imageList.size() == 0) {
            return communityDto;
        }
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        communityDto.setUploadFileNames(fileNameList);
        return communityDto;
    }

}
