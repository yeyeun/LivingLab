package com.mlp.lab.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mlp.lab.dto.ReplyDto;
import com.mlp.lab.dto.RoomReplyDto;
import com.mlp.lab.entity.ShareRoom;
import com.mlp.lab.entity.RoomReply;
import com.mlp.lab.entity.User;
import com.mlp.lab.repository.ShareRoomRepository;
import com.mlp.lab.repository.RoomReplyRepository;
import com.mlp.lab.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RoomReplyService {
    private final ModelMapper modelMapper;
    private final RoomReplyRepository roomReplyRepository;
    private final ShareRoomRepository shareRoomRepository;
    private final UserRepository userRepository;

    public void addReply(RoomReplyDto roomReplyDto){
        RoomReply roomReply = modelMapper.map(roomReplyDto, RoomReply.class);
        roomReply.setRegDate(LocalDateTime.now());
        roomReplyRepository.save(roomReply);
    }

    public void deleteReply(Long replyNo) {
        roomReplyRepository.deleteById(replyNo);
    }

    public List<RoomReplyDto> list(Long roomNo) {
        ShareRoom shareRoom = shareRoomRepository.findByRoomNo(roomNo);

        List<RoomReply> replies = roomReplyRepository.findByShareRoom(shareRoom);
        return replies.stream().map(roomReply -> modelMapper.map(roomReply, RoomReplyDto.class)).collect(Collectors.toList());

    }

    public void modify(Long replyNo, RoomReplyDto roomReplyDto) {
        String editReply = roomReplyDto.getContent();
        roomReplyRepository.modify(replyNo, editReply);
    }

    public List<RoomReplyDto> mylist(Long id) {
        User user = userRepository.findByUserId(id);
        List<RoomReply> replies = roomReplyRepository.findByUser(user);
        return replies.stream().map(roomReply -> modelMapper.map(roomReply, RoomReplyDto.class)).collect(Collectors.toList());
    }
}
