package com.mlp.lab.security.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.google.gson.Gson;
import com.mlp.lab.dto.UserDto;
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

    log.info("-------------------------------------");
    log.info(authentication);
    log.info("-------------------------------------");

    UserDto userDto = (UserDto) authentication.getPrincipal();

    Map<String, Object> claims = userDto.getClaims();

    String accessToken = JWTUtil.generateToken(claims, 10); // 10분, 지금 사용할 수 있는 거
    String refreshToken = JWTUtil.generateToken(claims, 60 * 24); // 교환권

    claims.put("accessToken", accessToken);
    claims.put("refreshToken", refreshToken);

    Gson gson = new Gson();

    String jsonStr = gson.toJson(claims);

    response.setContentType("application/json; charset=UTF-8");

    PrintWriter printWriter = response.getWriter();
    printWriter.println(jsonStr);
    printWriter.close();
  }
}
