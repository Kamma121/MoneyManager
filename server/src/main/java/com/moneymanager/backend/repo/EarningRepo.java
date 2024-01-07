package com.moneymanager.backend.repo;

import com.moneymanager.backend.model.Earning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EarningRepo extends JpaRepository<Earning, Long> {
    @Query("SELECT e FROM Earning e WHERE e.user.email = :email")
    List<Earning> findAllByUserEmail(String email);

    @Query("SELECT SUM(e.amount) FROM Earning e WHERE e.user.email = :email")
    Double sumAllByUserEmail(String email);
}
