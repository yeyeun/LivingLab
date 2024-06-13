package com.mlp.lab.entity;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;

import com.mlp.lab.dto.TeamDto;

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
@Table(name = "team")
@ToString(exclude = "imageList")
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
    private String nickname;
    private boolean flag; // 글 삭제시 작성 기록 관리를 위해 삭제된 글 표시

    @ElementCollection
    @Builder.Default
    private List<TeamImage> imageList = new ArrayList<>();

    public void addImage(TeamImage image) { // 이미지 추가
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) { // 파일 추가
        TeamImage temaImage = TeamImage.builder().fileName(fileName).build();
        addImage(temaImage);
    }

    public void clearList() {
        this.imageList.clear();
    }

    public static Team DtoToEntity(TeamDto teamDto) { // 화면에서 받은 dto를 entity로
        ModelMapper modelMapper = new ModelMapper();
        Team team = modelMapper.map(teamDto, Team.class);

        // 업로드 처리가 끝난 파일들의 이름
        List<String> uploadFileNames = teamDto.getUploadFileNames();
        if (uploadFileNames == null) {
            return team;
        }
        uploadFileNames.stream().forEach(uploadName -> {
            team.addImageString(uploadName);
        });

        return team;
    }

    public static TeamDto entityToDto(Team team) {
        ModelMapper modelMapper = new ModelMapper();
        TeamDto teamDto = modelMapper.map(team, TeamDto.class);

        List<TeamImage> imageList = team.getImageList();
        if (imageList == null || imageList.size() == 0) {
            return teamDto;
        }
        List<String> fileNameList = imageList.stream().map(productImage -> productImage.getFileName()).toList();
        teamDto.setUploadFileNames(fileNameList);
        return teamDto;
    }
}
