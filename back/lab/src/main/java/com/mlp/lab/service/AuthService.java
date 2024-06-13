// package com.mlp.lab.service;

// import org.modelmapper.ModelMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.mlp.lab.dto.ResponseDto;
// import com.mlp.lab.dto.SignUpDto;
// import com.mlp.lab.dto.UserDto;
// import com.mlp.lab.entity.User;
// import com.mlp.lab.repository.UserRepository;

// @Service
// public class AuthService {

// // private final ModelMapper modelMapper;
// @Autowired
// private final UserRepository userRepository;

// // 사용자가 DB에 없다면 새로운 데이터를 추가해줘야된다.
// public void save(User user) {
// userRepository.save(user);
// }

// public User findByEmail(String email) {
// return userRepository.findUserByEmail(email);
// }

// public User findId(String name, String phone) {
// return userRepository.findByNameAndPhone(name, phone);
// }

// // 회원가입 (등록, 이미지 포함)
// public void add(UserDto userDto) {
// User user = User.DtoToEntity(userDto);
// userRepository.save(user);
// }

// public ResponseDto<?> signUp(SignUpDto dto) {
// String email = dto.getEmail();
// String pwd = dto.getPwd();
// String pwdCheck = dto.getPwd();

// // email(id) 중복 확인
// try {
// // 존재하는 경우 : true / 존재하지 않는 경우 : false
// if (userRepository.findByEmail(email)) {
// return ResponseDto.setFailed("중복된 Email 입니다.");
// }
// } catch (Exception e) {
// return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
// }

// // password 중복 확인
// if (!pwd.equals(pwdCheck)) {
// return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
// }

// // UserEntity 생성
// User userEntity = new User(dto);

// // UserRepository를 이용하여 DB에 Entity 저장 (데이터 적재)
// try {
// userRepository.save(userEntity);
// } catch (Exception e) {
// return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
// }

// return ResponseDto.setSuccess("회원 생성에 성공했습니다.");
// }
// }