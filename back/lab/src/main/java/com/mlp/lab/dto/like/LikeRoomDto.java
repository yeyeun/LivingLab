package com.mlp.lab.dto.like;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeRoomDto {
    private Long likeNo;
    private Long id;
    private Long roomNo;
}
