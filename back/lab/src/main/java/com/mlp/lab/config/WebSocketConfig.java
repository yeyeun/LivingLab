package com.mlp.lab.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/chatting").withSockJS();
    registry.addEndpoint("/chatting");
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/topic");
    registry.setApplicationDestinationPrefixes("/app");
  }
}

// WebSocketMessageBrokerConfigure를 implement를 받아서 관련 메소드들을 오버라이드합니다.
// 위 STOMP의 구조를 설명했듯이 브로커라는 개념이 적용된다.
// setApplicationDesinationPrefixes 메소드를 이용하여서 전송할 목적지의 prefix값을 설정한다.
// 마지막으로 addEndpoint로 웹 소켓에서 활용될 주소를 적어주고
// withSockJS를 이용하여서 향상된 SockJS를 사용하겠다는 것을 알려준다
