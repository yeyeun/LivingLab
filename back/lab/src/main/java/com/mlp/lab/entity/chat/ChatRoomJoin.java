package com.mlp.lab.entity.chat;

import com.mlp.lab.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomJoin {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "join_id")
private Long id;

@ManyToOne
@JoinColumn(name = "user_id")
private User user;

@ManyToOne
@JoinColumn(name = "room_id")
private ChatRoom chatRoom;

public ChatRoomJoin(User user, ChatRoom chatRoom) {
this.user = user;
this.chatRoom = chatRoom;
}
}
