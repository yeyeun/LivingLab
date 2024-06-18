package com.mlp.lab.service.part;

import org.springframework.stereotype.Service;

import com.mlp.lab.dto.PartUserDto;
import com.mlp.lab.dto.PartUserListDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Transactional

public interface PartService {

  // 공동구매 한 게시물의 참여목록에 회원 추가
  List<PartUserListDto> addBuy(PartUserDto partUserDto, Long buyNo);

  // 공동구매 한 게시물의 모든 참여회원 목록
  List<PartUserListDto> getBuyPartUsers(Long buyNo);

  // 동네모임 한 게시물의 참여목록에 회원 추가
  List<PartUserListDto> add(PartUserDto partUserDto, Long teamNo);

  // 동네모임 한 게시물의 모든 참여회원 목록
  List<PartUserListDto> getPartUsers(Long teamNo);

  // 동네모임 참여목록에서 회원 삭제
  List<PartUserListDto> remove(Long pino);

  // 공동구매 참여목록에서 회원 삭제
  List<PartUserListDto> removeBuy(Long pino);
}
