package com.mlp.lab.entity.chat;

import com.mlp.lab.entity.Buy;
import com.mlp.lab.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    @JoinColumn(name = "buy_no")
    private Buy buy;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "writer_id", referencedColumnName = "id")
    private User writer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reader_id", referencedColumnName = "id")
    private User reader;

    // @Column(name = "create_at")
    // private final LocalDateTime createdAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

    // @Column(name = "update_at")
    // private final LocalDateTime updatedAt = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

    @Builder
    public ChatRoom(Long chatroomId, Buy buy, User writer, User reader) {
        this.chatroomId = chatroomId;
        this.buy = buy;
        this.writer = writer;
        this.reader = reader;
    }
}
