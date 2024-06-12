
// package com.mlp.lab.security.filter;

// import java.io.IOException;
// import java.io.PrintWriter;
// import java.util.List;
// import java.util.Map;

// import
// org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;

// import com.mlp.lab.dto.UserDto;
// import com.mlp.lab.util.JWTUtil;
// import com.google.gson.Gson;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import lombok.extern.log4j.Log4j2;

// @Log4j2
// public class JWTCheckFilter extends OncePerRequestFilter {

// @Override
// protected boolean shouldNotFilter(HttpServletRequest request) throws
// ServletException {

// String path = request.getRequestURI();
// log.info("check uri.............." + path);

// if (path.startsWith("/api/user/")) {
// return true; // true인 경우, 체크 안함 (api/user일떄, 회원이니깐 jwt 토큰 사용 안 함)
// }

// return false; // false인 경우 체크 함, true == not check
// }

// @Override
// protected void doFilterInternal(HttpServletRequest request,
// HttpServletResponse response,
// FilterChain filterChain) throws ServletException, IOException {

// log.info("---------------------------------");
// log.info("---------------------------------");
// log.info("---------------------------------");
// log.info("-----------------JWTCheckFilter.................");

// String authHeaderStr = request.getHeader("Authorization");

// // Bearer // 7개의 JWT 문자열
// try {
// // Bearer accestoken...
// String accessToken = authHeaderStr.substring(7);
// Map<String, Object> claims = JWTUtil.validateToken(accessToken);

// log.info("JWT claims: " + claims);
// log.info("통과");

// // filterChain.doFilter(request, response); // 통과
// ////////////////////////////////////////////////////////////////////////
// String email = (String) claims.get("email");
// String pwd = (String) claims.get("pwd");
// String nickname = (String) claims.get("nickname");
// Boolean social = (Boolean) claims.get("social");
// List<String> roleNames = (List<String>) claims.get("roleNames");

// UserDto userDto = new UserDto(email, pwd, nickname, social.booleanValue(),
// roleNames);

// log.info("-----------------------------------");
// log.info(userDto);
// log.info(userDto.getAuthorities());

// UsernamePasswordAuthenticationToken authenticationToken = new
// UsernamePasswordAuthenticationToken(userDto, pwd,
// userDto.getAuthorities());

// SecurityContextHolder.getContext().setAuthentication(authenticationToken);

// filterChain.doFilter(request, response); // 통과

// } catch (Exception e) {
// log.error("JWT Check Error..............");
// log.error(e.getMessage()); // Expired(만료됨)

// Gson gson = new Gson();
// String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

// response.setContentType("application/json");
// PrintWriter printWriter = response.getWriter();
// printWriter.println(msg);
// printWriter.close();

// }
// }
// }

// // access token에 문제가 있다는 메세지를 클라이언트(리액트)쪽에 전달하는 수준의 처리 구현