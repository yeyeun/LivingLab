package com.mlp.lab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mlp.lab.dto.JoinDto;
import com.mlp.lab.dto.LoginDto;
import com.mlp.lab.dto.LoginResponseDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.entity.UserEntity;
import com.mlp.lab.repository.UserRepository;


@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;

    public ResponseDto<?> join(JoinDto dto) { // 회원가입
        String email = dto.getEmail();
        String password = dto.getPwd();
        String confirmPwd = dto.getConfirmPwd();

        // email(id) 중복 확인
        try {
            // 존재하는 경우 : true / 존재하지 않는 경우 : false
            if (userRepository.existsById(email)) {
                // existsById: 주어진 ID에 해당하는 엔티티가 데이터베이스에 존재하는지 여부를 확인하는 데 사용
                return ResponseDto.setFailed("중복된 Email 입니다.");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        // password 중복 확인
        if (!password.equals(confirmPwd)) {
            return ResponseDto.setFailed("비밀번호가 일치하지 않습니다.");
        }

        // UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);

        // UserRepository를 이용하여 DB에 Entity 저장 (데이터 적재)
        try {
            userRepository.save(userEntity);
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        return ResponseDto.setSuccess("회원 가입에 성공했습니다.");
    }

    public ResponseDto<LoginResponseDto> login(LoginDto dto) {
        String email = dto.getEmail();
        String pwd = dto.getPwd();

        try {
            // 사용자 id/password 일치하는지 확인
            boolean existed = userRepository.existsByEmailAndPwd(email, pwd);
            if(!existed) {
                return ResponseDto.setFailed("아이디 비밀번호를 확인해주세요");
            }
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        UserEntity userEntity = null;

        try {
            // 값이 존재하는 경우 사용자 정보 불러옴 (기준 email)
            userEntity = userRepository.findById(email).get();
        } catch (Exception e) {
            return ResponseDto.setFailed("데이터베이스 연결에 실패하였습니다.");
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(userEntity);

        return ResponseDto.setSuccessData("환영합니다 "+userEntity.getNickname()+"님", loginResponseDto);
    }

}
