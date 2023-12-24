package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Expense;
import com.moneymanager.backend.repo.ExpenseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepo expenseRepo;

    @Override
    public Expense addExpense(Expense expense) {
        return expenseRepo.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses(String email) {
        return expenseRepo.findAllByUserEmail(email);
    }

    @Override
    public Expense getExpenseById(Long id) {
        return expenseRepo.findById(id).orElseThrow(() -> new RuntimeException("Expense not found with id " + id));
    }

    @Override
    public Expense updateExpense(Long id, Expense expense) {
        Optional<Expense> expenseOptional = expenseRepo.findById(id);
        if (expenseOptional.isPresent()) {
            Expense existingExpense = expenseOptional.get();
            existingExpense.setDate(expense.getDate());
            existingExpense.setCategory(expense.getCategory());
            existingExpense.setAmount(expense.getAmount());
            return expenseRepo.save(existingExpense);
        } else {
            throw new RuntimeException("Expense not found with id " + id);
        }
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepo.deleteById(id);
    }
}
