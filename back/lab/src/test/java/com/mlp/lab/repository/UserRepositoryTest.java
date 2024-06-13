package com.mlp.lab.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mlp.lab.entity.User;
import com.mlp.lab.entity.UserRole;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Test
  public void testInsertMember() {
    {
      for (int i = 0; i < 10; i++) {
        User user = User.builder()
            .email("user" + i + "@aaa.com")
            .pwd(passwordEncoder.encode("1111"))
            .nickname("USER" + i)
            .build();

        user.addRole(UserRole.USER);

        if (i >= 5) {
          user.addRole(UserRole.MANAGER);
        }

        if (i >= 8) {
          user.addRole(UserRole.ADMIN);
        }

        userRepository.save(user);

      }

    }
  }

  @Test
  public void TestRead() {
    String email = "user9@aaa.com";

    User user = userRepository.getWithRoles(email);

    log.info(user);
    log.info(user.getUserRoleList());
  }

}
