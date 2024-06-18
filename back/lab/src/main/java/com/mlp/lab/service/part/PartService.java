package com.mlp.lab.service.part;

import org.springframework.stereotype.Service;

import com.mlp.lab.dto.PartUserDto;
import com.mlp.lab.dto.PartUserListDto;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Transactional

public interface PartService {

  // 참여목록에 회원 추가
  List<PartUserListDto> add(PartUserDto partUserDto);

  // 모든 참여회원 목록
  List<PartUserListDto> getPartUsers(Long teamNo);

  // 참여목록에서 회원 삭제
  List<PartUserListDto> remove(Long pino);
}
