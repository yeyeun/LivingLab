package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.UserDto;
import com.mlp.lab.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@Log4j2
@RequiredArgsConstructor

// 카카오, 구글, 네이버 소셜 로그인용
public class SocialController {

  private final UserService userService;

  @GetMapping("/api/user/kakao")
  public String[] getUserFromKakao(String accessToken) {

    // react에서 가져온 accessToken을 여기로 전달

    log.info("accessToken: " + accessToken);

    UserDto userDto = userService.getKakaoMember(accessToken);

    Map<String, Object> claims = userDto.getClaims();

    return new String[] { "AAA", "BBB", "CCC" };
  }

}
