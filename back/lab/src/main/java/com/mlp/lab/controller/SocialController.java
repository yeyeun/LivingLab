package com.mlp.lab.controller;

import org.springframework.web.bind.annotation.RestController;

import com.mlp.lab.dto.UserDto;
import com.mlp.lab.service.UserService;
import com.mlp.lab.util.JWTUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequiredArgsConstructor // 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
// @RequestMapping("/api/user")

// 카카오, 구글, 네이버 소셜 로그인용
public class SocialController {

  private final UserService userService;

  // API 서버와 리액트 연동 확인
  @GetMapping("/api/user/kakao")
  public Map<String, Object> getUserFromKakao(@RequestParam(name="accessToken")String accessToken) {

    // react에서 가져온 accessToken을 여기로 전달
    log.info("accessToken: " + accessToken);

    UserDto userDto = userService.getKakaoMember(accessToken);

    Map<String, Object> claims = userDto.getClaims();

    String jwtAccessToken = JWTUtil.generateToken(claims, 10); // 10분, 지금 사용할 수 있는 거
    String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24); // 교환권

    claims.put("accessToken", jwtAccessToken);
    claims.put("refreshToken", jwtRefreshToken);

    return claims;
  }

}
// JSON 데이터 받으려면 @RequestBody 사용