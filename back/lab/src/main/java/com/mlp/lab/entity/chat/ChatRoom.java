// package com.mlp.lab.entity.chat;

// import java.util.ArrayList;
// import java.util.List;

// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.OneToMany;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Getter
// @Setter
// @NoArgsConstructor
// public class ChatRoom {
// @Id
// @GeneratedValue(strategy = GenerationType.AUTO)
// @Column(name = "room_id")
// private Long id;

// @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
// private List<ChatMessage> messages = new ArrayList<>();
// }
