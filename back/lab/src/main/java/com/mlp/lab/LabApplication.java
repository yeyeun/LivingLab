package com.mlp.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mlp.lab.domain.Sample;

import lombok.extern.log4j.Log4j2;

@Log4j2
@SpringBootApplication
public class LabApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabApplication.class, args);
		Sample sample = new Sample();
		sample.setName("LivingLab");
		log.info("자취연구소 " + sample.getName());
	}
}
