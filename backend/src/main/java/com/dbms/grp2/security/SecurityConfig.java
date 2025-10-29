package com.dbms.grp2.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    /**
     * This bean provides the global CORS configuration.
     * It's used by the .cors(Customizer.withDefaults()) rule below.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // This is your React app's origin
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // Allow all methods (GET, POST, etc.) and all headers
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));

        // This allows credentials (like your JWT token) to be sent
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Apply this configuration to all routes in your application
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable the CorsConfigurationSource bean defined above
                .cors(Customizer.withDefaults())

                // Disable CSRF protection (not needed for a stateless JWT API)
                .csrf(AbstractHttpConfigurer::disable)

                // Set the session management to STATELESS (don't use cookies)
                .sessionManagement(sessionconfig ->
                        sessionconfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        // remember: context-path=/api, so matcher sees only "/patients/**"
                        .requestMatchers("/public/**", "/error", "/auth/**").permitAll()
                        .requestMatchers("/patients/**").hasAnyRole("ADMIN", "PATIENT")
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/patients/**").hasAnyRole("ADMIN", "PATIENT")
                        .requestMatchers("/doctors/**").hasAnyRole("DOCTOR", "ADMIN")

                        // 4. Any other request must be authenticated
                        .anyRequest().authenticated()
                )

                // Add your custom JWT filter before the standard login filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                // Disable the default HTTP Basic login form
                .httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }

    /**
     * Exposes the AuthenticationManager as a Bean so it can be
     * injected into your AuthService for the /login endpoint.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Defines the PasswordEncoder (BCrypt) to be used for hashing
     * and checking passwords. This is injected into your AuthService.
     */

}