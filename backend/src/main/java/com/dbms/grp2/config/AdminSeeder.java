package com.dbms.grp2.config;

import com.dbms.grp2.model.Role;
import com.dbms.grp2.model.User;
import com.dbms.grp2.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin@dbms.com").isEmpty()) {
            User admin = User.builder()
                    .emailId("admin@dbms.com")
                    .password(passwordEncoder.encode("admin123"))
                    .roles(Set.of(Role.ADMIN))
                    .build();
            userRepository.save(admin);
            System.out.println("✅ Default admin created: admin@dbms.com / admin123");
        }
    }
}
