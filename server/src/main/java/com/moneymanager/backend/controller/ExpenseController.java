package com.moneymanager.backend.controller;

import com.moneymanager.backend.model.Expense;
import com.moneymanager.backend.service.ExpenseService;
import com.moneymanager.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final UserService userService;

    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getAllExpenses(Principal principal) {
        return ResponseEntity.ok(expenseService.getAllExpenses(principal.getName()));
    }
    @PostMapping("/expense/add")
    public ResponseEntity<List<Expense>> addExpense(@RequestBody List<Expense> expenses,Principal principal){
        for(Expense expense:expenses) {
            expense.setUser(userService.getUser(principal.getName()));
        }
        return ResponseEntity.ok(expenseService.addExpenses(expenses));
    }
    @PutMapping("/expense/{expenseId}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long expenseId,@RequestBody Expense expense){
        return ResponseEntity.ok(expenseService.updateExpense(expenseId,expense));
    }
    @DeleteMapping("/expense/{expenseId}")
    public ResponseEntity<?> addExpense(@PathVariable Long expenseId,Principal principal) throws AccessDeniedException {
        if(!principal.getName().equals(expenseService.getExpenseById(expenseId).getUser().getUsername())){
            throw new AccessDeniedException("You don't have access to this resource");
        }
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.ok("Expense with id: " + expenseId + " was successfully deleted.");
    }
}
