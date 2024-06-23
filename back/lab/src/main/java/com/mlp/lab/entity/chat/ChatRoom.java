package com.mlp.lab.entity.chat;

import java.util.*;

import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "chatroom")
@NoArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private Long chatroomId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "buy_no", referencedColumnName = "buy_no")
    private Buy buy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "writer_id", referencedColumnName = "id")
    private User writer;

    @ManyToMany
    @JoinTable(
        name = "chatroom_reader",
        joinColumns = @JoinColumn(name = "chatroom_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> reader = new ArrayList<>();

    @Builder
    public ChatRoom(Long chatroomId, Buy buy, User writer, List<User> reader) {
        this.chatroomId = chatroomId;
        this.buy = buy;
        this.writer = writer;
        this.reader = reader;
    }
}
