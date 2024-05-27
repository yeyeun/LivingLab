package com.mlp.lab.entity;

import com.mlp.lab.dto.JoinDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data   //@Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor 를 자동으로 적용
@AllArgsConstructor //모든 필드 값을 파라미터로 받는 생성자를 생성
@NoArgsConstructor  //파라미터가 없는 디폴트 생성자를 생성
@Entity
@Table(name = "user")   //db 테이블명과 맞춰야함
public class UserEntity {
    @Id //기본키(PK) 설정
    private String email;
    private String name;
    private String pwd;
    private String phone;
    private String addr;
    private String birth;
    private String nickname;

    public UserEntity(JoinDto dto){   //화면에서 dto를 통해 받은 값과 Entity를 통해 DB에 저장할 값을 지정
        this.email = dto.getEmail();
        this.name = dto.getName();
        this.pwd = dto.getPwd();
        this.phone = dto.getPwd();
        this.addr = dto.getAddr();
        this.birth = dto.getBirth();
        this.nickname = dto.getNickname();
    }
}
