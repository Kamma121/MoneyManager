package com.moneymanager.backend;

import com.moneymanager.backend.model.User;
import com.moneymanager.backend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MoneymanagerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoneymanagerBackendApplication.class, args);
	}
	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveUser(new User("John", "Doe", "john.doe@gmail.com", "test123"));
			userService.saveUser(new User("Ashley", "Austin", "test@gmail.com", "test123"));
			userService.saveUser(new User("Mary", "Smith", "mary.smith@outlook.com", "password"));
			userService.saveUser(new User("Dave", "Morty", "dave121@outlook.com", "password"));
		};
	}

}
