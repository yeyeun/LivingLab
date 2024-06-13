// package com.mlp.lab.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import com.mlp.lab.dto.ResponseDto;
// import com.mlp.lab.dto.SignUpDto;
// import com.mlp.lab.service.AuthService;

// @RestController
// @CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/api/auth")
// public class AuthController {
// @Autowired
// AuthService authService;

// @SuppressWarnings("unchecked")
// @PostMapping("/signUp")
// public ResponseDto<SignUpDto> signUp(@RequestBody SignUpDto requestBody) {
// ResponseDto<?> result = authService.signUp(requestBody);
// return (ResponseDto<SignUpDto>) result;
// }
// }