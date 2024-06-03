package com.mlp.lab;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mlp.lab.entity.ShareRoom;
import com.mlp.lab.repository.ShareRoomRepository;

@SpringBootTest
class LabApplicationTests {

	@Autowired
	private ShareRoomRepository shareRoomRepository;

	@Test
	void contextLoads() {
	}

	@Test
    public  void testInsert(){
		for (int i = 0; i < 10; i++) {
			ShareRoom shareRoom = ShareRoom.builder()
			.bookmark(true)
			.content("asd")
			.email(null)
			.location(null)
			.monthlyRent(100000).build();

			shareRoomRepository.save(shareRoom);			
		}
	}
}
