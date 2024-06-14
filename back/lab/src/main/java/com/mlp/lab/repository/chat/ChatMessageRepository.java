package com.mlp.lab.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mlp.lab.entity.chat.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage,
Long> {

}
