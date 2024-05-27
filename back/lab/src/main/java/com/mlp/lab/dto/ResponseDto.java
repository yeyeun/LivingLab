package com.mlp.lab.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName = "set")
public class ResponseDto<D> {
    /*ResponseDto: 
        -Controller에서 최종적으로 내보내는 Dto에 대한 형태를 통일
        -응답 시 처리 결과 뿐만이 아닌 status, message, timestamp에 대한 값을 추가로 내보냄
          ㄴtimestamp와 status같은 메타데이터를 포함하여 이후 디버깅 등에 활용 가능
    */
    private boolean result; 
    private String message;
    private D data;

    public static <D> ResponseDto<D> setSuccess(String message) {
        return ResponseDto.set(true, message, null);
    }

    public static <D> ResponseDto<D> setFailed(String message) {
        return ResponseDto.set(false, message, null);
    }

    public static <D> ResponseDto<D> setSuccessData(String message, D data) {
        return ResponseDto.set(true, message, data);
    }

    public static <D> ResponseDto<D> setFailedData(String message, D data) {
        return ResponseDto.set(false, message, data);
    }
}
