package com.mlp.lab.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.MarketDto;
import com.mlp.lab.dto.RoomPageRequestDto;
import com.mlp.lab.dto.RoomPageResponseDto;
import com.mlp.lab.dto.ShareRoomDto;
import com.mlp.lab.entity.Market;
import com.mlp.lab.entity.MarketImage;
import com.mlp.lab.entity.ShareRoom;
import com.mlp.lab.entity.ShareRoomImage;
import com.mlp.lab.repository.ShareRoomRepository;

import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShareRoomService {
    private final ModelMapper modelMapper;
    private final ShareRoomRepository shareRoomRepository;

    public RoomPageResponseDto<ShareRoomDto> list(RoomPageRequestDto roomPageRequestDto,String search, String sort) {

        Pageable pageable = PageRequest.of(
                roomPageRequestDto.getPage() - 1,
                roomPageRequestDto.getSize(),
                Sort.by("roomNo").descending());

        Page<Object[]> result = null;


        if ((search == null || search.isEmpty()) && (sort == null || sort.isEmpty())) { // 페이지 클릭 시 serch null / sort null
            result = shareRoomRepository.selectList(pageable);
        } else if ((search != null && !search.isEmpty()) && (sort == null || sort.isEmpty())) { // 검색만 serch not null / sort null
            result = shareRoomRepository.selectSearchList(search, pageable);
        } else if ((sort != null && !sort.isEmpty()) && (search == null || search.isEmpty())) { // 정렬만 serch null / sort not null
            if(sort.equals("최신순")){
                result = shareRoomRepository.newList(pageable);
            }
            if(sort.equals("낮은가격순")){
                result = shareRoomRepository.lowPriceList(pageable);
            }
        } else if (search != null && sort != null) { // 검색&&정렬 둘다 serch not null / sort not null
            if(sort.equals("최신순")){
                result = shareRoomRepository.searchNewList(search, pageable);
            }
            if(sort.equals("낮은가격순")){
                result = shareRoomRepository.searchLowPriceList(search, pageable);
            }
        }


        List<ShareRoomDto> dtoList = result.get().map(arr -> {
            ShareRoom shareRoom = (ShareRoom) arr[0];
            ShareRoomImage shareRoomImage = (ShareRoomImage) arr[1];

            ShareRoomDto shareRoomDto = ShareRoomDto.builder()
                    .roomNo(shareRoom.getRoomNo())
                    .title(shareRoom.getTitle())
                    .content(shareRoom.getContent())
                    .rentFee(shareRoom.getRentFee())
                    .parking(shareRoom.getParking())
                    .location(shareRoom.getLocation())
                    .rentStartDate(shareRoom.getRentStartDate())
                    .rentEndDate(shareRoom.getRentEndDate())
                    .averFee(shareRoom.getAverFee())
                    .days(shareRoom.getDays())
                    .option1(shareRoom.getOption1())
                    .build();

            String imageStr = shareRoomImage.getFileName();
            shareRoomDto.setUploadFileNames(List.of(imageStr));
            return shareRoomDto;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();
        RoomPageResponseDto<ShareRoomDto> responseDTO = RoomPageResponseDto.<ShareRoomDto>withAll()
                .dtoList(dtoList)
                .roomPageRequestDto(roomPageRequestDto)
                .totalCount(totalCount)
                .build();
        return responseDTO;
    }

    public void add(ShareRoomDto shareRoomDto) { // 룸쉐어 등록(이미지 포함)
        ShareRoom shareRoom = ShareRoom.DtoToEntity(shareRoomDto);
        shareRoomRepository.save(shareRoom);
    }

    public ShareRoomDto get(Integer roomNo) {
        Optional<ShareRoom> result = shareRoomRepository.findById(roomNo);
        ShareRoom shareRoom = result.orElseThrow();
        ShareRoomDto shareRoomDto = shareRoom.entityToDto(shareRoom);
        return shareRoomDto;
    }

    public void remove(Integer roomNo) {
        shareRoomRepository.deleteById(roomNo);
    }

    public void modify(ShareRoomDto shareRoomDto) { // 수정하기
        // 조회
        Optional<ShareRoom> result = shareRoomRepository.findById(shareRoomDto.getRoomNo().intValue());
        ShareRoom shareRoom = result.orElseThrow();

        // 수정
        shareRoom.setTitle(shareRoomDto.getTitle());
        shareRoom.setContent(shareRoomDto.getContent());
        shareRoom.setRentFee(shareRoomDto.getRentFee());
        shareRoom.setParking(shareRoomDto.getParking());
        shareRoom.setLocation(shareRoomDto.getLocation());
        shareRoom.setRentStartDate(shareRoomDto.getRentStartDate());
        shareRoom.setRentEndDate(shareRoomDto.getRentEndDate());
        shareRoom.setAverFee(shareRoomDto.getAverFee());
        shareRoom.setDays(shareRoomDto.getDays());
        shareRoom.setOption1(shareRoomDto.getOption1());

        // 파일들 삭제
        shareRoom.clearList();
        List<String> uploadFileNames = shareRoomDto.getUploadFileNames();
        if (uploadFileNames != null && uploadFileNames.size() > 0) {
            uploadFileNames.stream().forEach(uploadName -> {
                shareRoom.addImageString(uploadName);
            });
        }
        shareRoomRepository.save(shareRoom);
    }

     // 메인에 표기할 최신순
    public List<ShareRoomDto> getLatestShareRoom() {
        Pageable pageable = PageRequest.of(0, 3, Sort.by("roomNo").descending());
        Page<Object[]> result = null;

        result = shareRoomRepository.latestShareRoomList(pageable);

        List<ShareRoomDto> dtoList = result.getContent().stream().map(arr -> {
            ShareRoom shareRoom = (ShareRoom) arr[0];
            ShareRoomImage shareRoomImage = (ShareRoomImage) arr[1];

            ShareRoomDto shareRoomDto = ShareRoomDto.builder()
                    .roomNo(shareRoom.getRoomNo())
                    .title(shareRoom.getTitle())
                    .content(shareRoom.getContent())                  
                    .rentFee(shareRoom.getRentFee())
                    .parking(shareRoom.getParking())
                    .location(shareRoom.getLocation())
                    .rentStartDate(shareRoom.getRentStartDate())
                    .rentEndDate(shareRoom.getRentEndDate())
                    .averFee(shareRoom.getAverFee())
                    .days(shareRoom.getDays())
                    .option1(shareRoom.getOption1())
                    .build();

            String imageStr = shareRoomImage.getFileName();
            shareRoomDto.setUploadFileNames(List.of(imageStr));
            return shareRoomDto;
        }).collect(Collectors.toList());

        return dtoList;
    }

    public void increase(Long roomNo) { // 좋아요 +1
        Optional<ShareRoom> result = shareRoomRepository.findById(roomNo.intValue());
        ShareRoom shareRoom = result.orElseThrow();
        shareRoom.setRoomHit(shareRoom.getRoomHit()+1);
        shareRoomRepository.save(shareRoom);
    }

    public void decrease(Long roomNo) { // 좋아요 -1
        Optional<ShareRoom> result = shareRoomRepository.findById(roomNo.intValue());
        ShareRoom shareRoom = result.orElseThrow();
        shareRoom.setRoomHit(shareRoom.getRoomHit()-1);
        shareRoomRepository.save(shareRoom);
    }

}