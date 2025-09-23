package com.dbms.grp2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@Configuration
@EnableJpaAuditing // This configuration enables JPA auditing for automatic timestamping
public class DhmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DhmsApplication.class, args);
	}

}
