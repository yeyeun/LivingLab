package com.mlp.lab.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyActivityDto {
    /* 공동구매, 동네모임, 동네장터, 커뮤니티용 */
    private Long no;
    private Character category;
    private String title;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime regDate;

    /* 자취방쉐어용 */
    private String rentStartDate;
    private String rentEndDate;
    private String rent_fee;

}
