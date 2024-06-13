package com.mlp.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import lombok.extern.log4j.Log4j2;

@Log4j2
@EnableJpaAuditing //글 작성날짜,수정날짜 자동생성
@SpringBootApplication
public class LabApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabApplication.class, args);
		log.info("자취연구소");
	}
}
