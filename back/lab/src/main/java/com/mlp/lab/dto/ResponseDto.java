package com.mlp.lab.dto;

import java.util.Optional;

import com.mlp.lab.entity.Buy;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set") // staticName = "set" : "set"이라는 이름의 정적 메소드 생성
public class ResponseDto<D> {
    private boolean result;
    private String message;
    private D data;

    public static <D> ResponseDto<Object> setSuccess(String message) {
        return ResponseDto.set(true, message, null);
    }

    public static <D> ResponseDto<Object> setFailed(String message) {
        return ResponseDto.set(false, message, null);
    }

    public static <D> ResponseDto<D> setSuccessData(String message, D data) {
        return ResponseDto.set(true, message, data);
    }

    public static <D> ResponseDto<D> setFailedData(String message, D data) {
        return ResponseDto.set(false, message, data);
    }

}
