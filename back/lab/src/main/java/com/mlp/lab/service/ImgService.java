package com.mlp.lab.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.entity.User;
import com.mlp.lab.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImgService {

  private final UserRepository userRepository;

  // 파일 저장 서비스
  public ResponseEntity<String> updateUserImg(String email, MultipartFile imgFile) throws Exception {
    // Optional<User> userOptional = userRepository.findById(id);
    Optional<User> userOptional = userRepository.findByEmail(email);
    // 받아온 이메일로 유저 테이블에서 해당 유저가 있는지 조회

    if (userOptional.isPresent()) {
      // 유저 정보가 있으면
      User user = userOptional.get();

      // 파일 저장 처리
      User savedEntity = fileHandler(imgFile, email);

      if (savedEntity != null) {
        if (user.getProfileImage() != null) {
          // 기존 칼럼에 프사 경로 있으면 지움
          deleteUserImg(email);
        }

        // 이미지 url을 업데이트한 후 저장
        user.setProfileImage(savedEntity.getProfileImage());
        userRepository.save(user);

        // 파일 처리 성공 시 메시지 반환
        return ResponseEntity.ok().body("이미지 업데이트");
      }
    } else {
      // 유저 정보가 없으면
      String errorMsg = "해당 이메일 가진 회원 없음 : " + email;
      System.err.println(errorMsg);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMsg);
    }

    return null; // 다시 한번 체크!!
  }

  public User fileHandler(MultipartFile file, String email) throws Exception {

    // 현재 작업경로의 절대경로
    // File.separator (/)
    String absolutePath = new File("").getAbsolutePath() + File.separator;

    // 파일 저장 위치
    String path = "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static"
        + File.separator + "images" + File.separator + "userImg";
    File userImg = new File(path);

    if (!userImg.exists()) {
      // 폴더없으면 생성
      userImg.mkdirs();
    }

    if (!file.isEmpty()) {
      // 파일이 비어있지 않으면
      String contentType = file.getContentType();
      String originalFileExtension;

      // 타입에 따른 확장자 결정
      if (ObjectUtils.isEmpty(contentType)) {
        // 타입 없으면 null
        return null;
      } else {
        if (contentType.contains("image/jpeg")) {
          originalFileExtension = ".jpg";
        } else if (contentType.contains("image/png")) {
          originalFileExtension = ".png";
        } else {
          return null;
        }
      }

      // 파일저장 이름
      String originalFileName = file.getOriginalFilename();
      // 확장자를 제외한 파일 이름과 확장자 추출
      int lastIndex = originalFileName.lastIndexOf('.');
      String fileName = originalFileName.substring(0, lastIndex);

      String userImgName = fileName + System.nanoTime() + originalFileExtension;

      // 파일 저장
      userImg = new File(absolutePath + path + File.separator + userImgName);
      System.out.println("파일 저장경로:" + absolutePath + path + File.separator + userImgName);
      file.transferTo(userImg);

      // 새로운 UserEntity 생성 및 파일 경로 전달 (db 저장에 사용)
      User user = new User();
      user.setProfileImage(path + File.separator + userImgName); // 실제 저장된 위치

      return user;

    }

    return null;
  }

  public ResponseEntity<String> deleteUserImg(String email) {
    // Optional<User> userOptional = userRepository.findById(id);
    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isPresent()) {
      // 유저 정보가 있으면
      User user = userOptional.get();
      try {
        File imageFile = new File(user.getProfileImage());

        if (imageFile.exists()) {
          // 파일이 존재하면 삭제
          System.out.println("파일 존재함");
          if (imageFile.delete()) { // 파일삭제
            // db 삭제
            user.setProfileImage(null);
            userRepository.save(user);

            return ResponseEntity.ok("이미지 삭제 성공");
          } else {
            // 파일 삭제 실패 시 오류 메시지 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 파일 삭제 실패");
          }
        } else {
          // 파일이 존재하지 않으면
          return ResponseEntity.ok("이미지 파일이 이미 존재하지 않습니다.");
        }
      } catch (Exception e) {
        // 파일 처리 실패 시 에러 메시지 반환
        System.err.println(e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 삭제 오류");
      }
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(email + " 해당 이메일을 가진 사용자를 찾을 수 없습니다");
    }
  }

  public byte[] getUserProfileImage(String email) throws IOException {
    System.out.println("getUserProfileImage 실행");

    // Optional<User> userOptional = userRepository.findById(id);
    Optional<User> userOptional = userRepository.findByEmail(email);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      String profileImagePath = user.getProfileImage();

      System.out.println("profileImagePath: " + profileImagePath);

      // 프로필 이미지 경로가 null이 아니고 빈 문자열이 아닌 경우에만 이미지를 읽어옴
      if (!StringUtils.isEmpty(profileImagePath)) {
        Path imagePath = Paths.get(profileImagePath);
        System.out.println("imagePath: " + imagePath);

        if (Files.exists(imagePath)) {
          // 파일이 존재하는 경우에만 읽어옴
          return Files.readAllBytes(imagePath);
        } else {
          System.out.println("파일이 존재하지 않습니다.");
        }
      } else {
        System.out.println("프로필 이미지 경로가 비어 있습니다.");
      }
    } else {
      System.out.println("해당 유저가 존재하지 않습니다.");
    }

    // 만약 프로필 이미지를 찾을 수 없는 경우 빈 바이트 배열 반환
    return new byte[0];
  }
}
