package com.mlp.lab.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTimeEntity {  //Auditing의 기능 중 생성일, 최근 수정일 사용
    
    @CreatedDate    //생성시 자동 저장
    @Column(updatable = false)
    private LocalDateTime createdDate;  //생성날짜

    @LastModifiedDate // 변경시 자동 저장
    private LocalDateTime updateTime;

}
