package com.moneymanager.backend;

import com.moneymanager.backend.model.Expense;
import com.moneymanager.backend.model.User;
import com.moneymanager.backend.service.ExpenseService;
import com.moneymanager.backend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class MoneymanagerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoneymanagerBackendApplication.class, args);
	}
	@Bean
	CommandLineRunner run(UserService userService, ExpenseService expenseService) {
		return args -> {
			userService.saveUser(new User("John", "Doe", "john.doe@gmail.com", "test123"));
			userService.saveUser(new User("Ashley", "Austin", "test@gmail.com", "test123"));
			userService.saveUser(new User("Mary", "Smith", "mary.smith@outlook.com", "password"));
			userService.saveUser(new User("Dave", "Morty", "dave121@outlook.com", "password"));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"House & Bills","House rent",500,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"House & Bills","House rent",500,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"House & Bills","House rent",500,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"Transport","Car payment",200,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"Food & Groceries","Groceries",50,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"Entertainment & Education","Books",80,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"Clothing & Personal care","Levi's jeans",100,userService.getUser("john.doe@gmail.com")));
			expenseService.addExpense(new Expense(null, LocalDate.now(),"Other","Christmas gift",150,userService.getUser("john.doe@gmail.com")));
		};
	}

}
