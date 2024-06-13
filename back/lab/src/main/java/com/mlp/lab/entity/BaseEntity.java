package com.mlp.lab.entity;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@EntityListeners(value = {AuditingEntityListener.class})
@MappedSuperclass
@Getter
public abstract class BaseEntity extends BaseTimeEntity{//Auditing의 기능 중 작성자, 최근 수정자
    
    /* BaseTimeEntity를 상속받기 때문에 BaseEntity를 상속받으면 기본으로
        Auditing의 기능 중 작성자, 최근 수정자를 사용가능하고 생성일, 최근 수정일도
        사용가능 */

    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    @LastModifiedBy
    private String modifiedBy;
}
