// package com.mlp.lab.security;

// import java.util.stream.Collectors;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// // import com.mlp.lab.dto.MemberDto;
// import com.mlp.lab.dto.UserDto;
// import com.mlp.lab.entity.User;
// import com.mlp.lab.repository.UserRepository;

// import lombok.RequiredArgsConstructor;
// import lombok.extern.log4j.Log4j2;

// @RequiredArgsConstructor
// @Service
// @Log4j2
// public class CustomUserDetailsService implements UserDetailsService {

// private final UserRepository userRepository;

// @Override
// public UserDetails loadUserByUsername(String username) throws
// UsernameNotFoundException {

// log.info("-----loadUserByUsername-----" + username);

// User user = userRepository.getWithRoles(username);

// if (user == null) {
// throw new UsernameNotFoundException("Not Found");
// }

// UserDto userDto = new UserDto(
// user.getId(),
// user.getEmail(),
// user.getPwd(),
// user.getPwdCheck(),
// user.getName(),
// user.getPhone(),
// user.getNickname(),
// user.getAddr(),
// user.getDetailAddr(),
// user.getProfileImage(),
// user.getLocation(),
// user.isSocial(),
// user.getUserRoleList()
// .stream()
// .map(userRole -> userRole.name()).collect(Collectors.toList()));

// log.info(userDto);

// return userDto;

// // 시큐리티에 대한 권한 처리 끝남, 로그를 찍어보면 인증은 됨, 그 다음 지금 필요한 건 인증 후에 어떤 처리를 할 것이냐
// }
// }
