package com.mlp.lab.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mlp.lab.dto.LoginDto;
import com.mlp.lab.dto.ResponseDto;
import com.mlp.lab.dto.UserDto;
import com.mlp.lab.entity.User;
import com.mlp.lab.service.UserService;
import com.mlp.lab.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@CrossOrigin(origins = "*")
@RestController
@Log4j2
@RequestMapping("/api/user")
@RequiredArgsConstructor // 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성
public class UserController {
    // final을 붙여 생성자 생성(@Autoweird 대신)
    private final UserService userService;
    private final CustomFileUtil fileUtil;

    @PostMapping("/login")
    @ResponseBody
    public User login(@RequestBody LoginDto loginDto) {
        User user = userService.findByEmail(loginDto.getEmail());
        if (user == null || (!user.getPwd().equals(loginDto.getPwd()))) {
            return null;
        }
        return user; //로그인 정보 그대로 다 준다
    }

    @PostMapping("/join")
    public ResponseDto<Object> join(UserDto userDto) {
        String uploadFileNames = fileUtil.saveFile(userDto.getFile());
        userDto.setUploadFileName(uploadFileNames);
        userService.add(userDto);
        return ResponseDto.setSuccess("회원가입 완료");
    }

    @PostMapping("/findId")
    public ResponseDto<Object> findId(@RequestBody UserDto userDto) {
        User user = userService.findId(userDto.getName(), userDto.getPhone());
        if(user == null){
            return ResponseDto.setFailed("존재 하지 않는 회원입니다. 이름과 번호를 다시 확인해주세요");
        }
        return ResponseDto.setSuccess(user.getName() + "님의 아이디는 " + user.getEmail() + " 입니다.");
    }

    @PostMapping("/findPwd")    //인증번호 발송 클릭 시 
    public ResponseDto<Object> findPwd(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String pwd = userService.findByEmail(email).getPwd();
        return ResponseDto.setSuccessData("비밀번호", pwd);
    }

    // 회원정보 수정
    @PutMapping("/modify")
    public Map<String, String> modifyUser(@RequestBody UserDto userDto) {
        log.info("---------------------userInfo modify-------------------");
        userService.modifyUserInfo(userDto);
        return Map.of("result", "userInfo modified");
    }

    // 회원정보 조회
    @GetMapping("/{id}")
    @ResponseBody
    public Optional<User> get(@PathVariable(name = "id") Long id) {
        Optional<User> user = userService.get(id);
        return user;
    }

    @GetMapping("/display/{fileName}") //  이미지 파일 출력
    public ResponseEntity<Resource> displayImage(@PathVariable(name = "fileName") String fileName) {
        return fileUtil.getFile(fileName);
    }

    // 프로필 이미지 업로드
    @PutMapping("/update/profileImage/{userId}")
    public ResponseEntity<String> updateProfileImage(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            String uploadedFileName = fileUtil.updateFile(userId.toString(), file);
            return ResponseEntity.ok("이미지가 성공적으로 업로드되었습니다: " + uploadedFileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("이미지 업로드에 실패했습니다: " + e.getMessage());
        }
    }

    // 프로필 이미지 삭제
    @DeleteMapping("/delete/profileImage/{userId}")
    public ResponseEntity<String> deleteProfileImage(@PathVariable Long userId) {
        try {
            fileUtil.deleteFile(userId.toString());
            return ResponseEntity.ok("프로필 이미지가 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("프로필 이미지 삭제에 실패했습니다: " + e.getMessage());
        }
    }
}