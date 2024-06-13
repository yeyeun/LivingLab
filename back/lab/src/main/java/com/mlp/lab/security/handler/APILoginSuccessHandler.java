package com.mlp.lab.security.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.google.gson.Gson;
import com.mlp.lab.dto.MemberDto;
import com.mlp.lab.util.JWTUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

// 로그인 성공 처리
@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {

    log.info("---APILoginSuccessHandler-----");
    log.info(authentication);
    log.info("------------------------------");

    // 로그인 성공 후, JSON 데이터 생성 후 전송
    MemberDto memberDto = (MemberDto) authentication.getPrincipal();

    Map<String, Object> claims = memberDto.getClaims();

    String accessToken = JWTUtil.generateToken(claims, 10); // 10분(지금 사용할 수 있는 토큰)
    String refreshToken = JWTUtil.generateToken(claims, 60 * 24); // 교환권

    claims.put("accessToken", accessToken);
    claims.put("refreshToken", refreshToken);

    Gson gson = new Gson(); // claims를 json 문자열로 바꾸기 위해 사용

    String jsonStr = gson.toJson(claims);

    response.setContentType("application/json; charset=UTF-8"); // json 문자열 타입으로 만듦, 한글 처리(UTF-8)

    PrintWriter printWriter = response.getWriter(); // java.io
    printWriter.println(jsonStr);
    printWriter.close();
  }
}
