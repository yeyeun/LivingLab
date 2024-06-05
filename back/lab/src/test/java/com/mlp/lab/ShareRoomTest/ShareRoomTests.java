package com.mlp.lab.ShareRoomTest;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.mlp.lab.entity.ShareRoom;
import com.mlp.lab.repository.ShareRoomRepository;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
class ShareRoomTests {

	@Autowired
	private ShareRoomRepository shareRoomRepository;

	@Test
	void contextLoads() {
	}

	@Test
    public  void testInsert(){
		for (int i = 0; i < 20; i++) {
			ShareRoom shareRoom = ShareRoom.builder()
			.title("제목"+i)
			.rentFee("1000")
			.content("asd")
			.option1("냉장고,에어컨,세탁기")
			.parking('O')
			// user 테이블에 id 값이 1인 데이터가 하나는 있어야함
			.userId(1)
			.location(null).build();
			

			shareRoomRepository.save(shareRoom);			
		}
	}

	@Test
	public void testPaging() {
		// 페이지 번호는 0 부터
		Pageable pageable = PageRequest.of(0,9,Sort.by("roomNo").descending());
		
		Page<ShareRoom> result = shareRoomRepository.findAll(pageable);

		log.info(result.getTotalElements());

		log.info(result.getContent());

	}
}
