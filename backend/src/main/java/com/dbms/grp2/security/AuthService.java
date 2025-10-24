package com.dbms.grp2.security;

import com.dbms.grp2.dto.DoctorSignupRequestDto;
import com.dbms.grp2.dto.LoginRequestDto;
import com.dbms.grp2.dto.LoginResponseDto;
import com.dbms.grp2.dto.SignupResponseDto;
import com.dbms.grp2.model.Employee;
import com.dbms.grp2.model.Patient;
import com.dbms.grp2.model.Role;
import com.dbms.grp2.model.User;
import com.dbms.grp2.repository.EmployeeRepository;
import com.dbms.grp2.repository.PatientRepository;
import com.dbms.grp2.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PatientRepository patientRepository;
    private final EmployeeRepository employeeRepository;

    public LoginResponseDto login(@Valid LoginRequestDto loginRequestDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmailId(),
                        loginRequestDto.getPassword()
                )
        );

        User user = (User) authentication.getPrincipal();
        String token = authUtil.createToken(user);

        return new LoginResponseDto(token, user.getId(), user.getRoles()
                .stream()
                .map(Enum::name)
                .collect(Collectors.toList()));
    }

    public SignupResponseDto signup(@Valid LoginRequestDto signUpRequestDto) {
        User user = userRepository.findByUsername(signUpRequestDto.getEmailId()).orElse(null);

        if (user != null) throw new IllegalArgumentException("User already exists");

        user = userRepository.save(User.builder()
                .emailId(signUpRequestDto.getEmailId())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .roles(Set.of(Role.PATIENT))
                .build());

        patientRepository.save(Patient.builder()
                .emailId(signUpRequestDto.getEmailId())
                .user(user)
                .build());

        return new SignupResponseDto(user.getId(), user.getEmailId());
    }

    @Transactional
    public void promoteToAdmin(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.getRoles().add(Role.ADMIN);
    }

//    @Transactional
//    public SignupResponseDto signupDoctor(@Valid DoctorSignupRequestDto signUpRequestDto) {
//        Employee doctor = employeeRepository.findById(signUpRequestDto.getDoctorId())
//                .orElseThrow(()-> new IllegalArgumentException("Doctor not found in hospital database"));
//
//        if(!Objects.equals(doctor.getEmailId(), signUpRequestDto.getEmailId())){
//            throw new IllegalArgumentException("Doctor ID and email ID do not match");
//        }
//
//        if(doctor.getHumanResource() != "Doctor")
//
//        if(doctor.getUser() != null) {
//            throw new RuntimeException("Doctor already registered");
//        }
//
//        User user = userRepository.save(User.builder()
//                .emailId(signUpRequestDto.getEmailId())
//                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
//                .roles(Set.of(Role.DOCTOR))
//                .build());
//
//        doctor.setUser(user);
//        return new SignupResponseDto(user.getId(), user.getEmailId());
//    }
}
