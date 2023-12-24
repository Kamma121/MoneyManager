package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Expense;

import java.util.List;

public interface ExpenseService {
    Expense addExpense(Expense expense);

    List<Expense> getAllExpenses(String email);

    Expense getExpenseById(Long id);

    Expense updateExpense(Long id, Expense expense);

    void deleteExpense(Long id);
}
