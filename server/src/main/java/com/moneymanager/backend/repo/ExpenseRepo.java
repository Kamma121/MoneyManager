package com.moneymanager.backend.repo;

import com.moneymanager.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense,Long> {
    @Query("SELECT e FROM Expense e WHERE e.user.email = :email")
    List<Expense> findAllByUserEmail(String email);
}
