package com.mlp.lab.security.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class APILoginFailHandler implements AuthenticationFailureHandler {
  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException exception) throws IOException, ServletException {

    log.info("Login fail....." + exception);

    Gson gson = new Gson();

    String jsonStr = gson.toJson(Map.of("error", "ERROR_LOGIN")); // 로그인 실패 에러메시지

    response.setContentType("application/json"); // json 문자열 만듦
    PrintWriter printWriter = response.getWriter();
    printWriter.println(jsonStr); // 에러메시지 출력
    printWriter.close();

  }
}
