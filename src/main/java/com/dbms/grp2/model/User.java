package com.dbms.grp2.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Column(unique = true)
    private String emailId;
    @NotBlank
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;  // 👈 add this

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Spring expects roles as "ROLE_<name>"
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    @Override
    public String getUsername() {
        return emailId;
    }
}
