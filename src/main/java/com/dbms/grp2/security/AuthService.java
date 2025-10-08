package com.dbms.grp2.security;

import com.dbms.grp2.dto.LoginRequestDto;
import com.dbms.grp2.dto.LoginResponseDto;
import com.dbms.grp2.dto.SignupResponseDto;
import com.dbms.grp2.model.User;
import com.dbms.grp2.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDto login(@Valid LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmailId(),
                        loginRequestDto.getPassword()
                )
        );

        User user = (User) authentication.getPrincipal();
        String token = authUtil.createToken(user);

        return new LoginResponseDto(token, user.getId());
    }

    public SignupResponseDto signup(@Valid LoginRequestDto signUpRequestDto) {
        User user = userRepository.findByUsername(signUpRequestDto.getEmailId()).orElse(null);

        if (user != null) throw new IllegalArgumentException("User already exists");

        user = userRepository.save(User.builder()
                .emailId(signUpRequestDto.getEmailId())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .build());

        return new SignupResponseDto(user.getId(), user.getEmailId());
    }
}
