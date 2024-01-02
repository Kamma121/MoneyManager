package com.moneymanager.backend.repo;


import com.moneymanager.backend.model.Saving;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SavingRepo extends JpaRepository<Saving, Long> {
    @Query("SELECT s FROM Saving s WHERE s.user.email = :email")
    List<Saving> findAllByUserEmail(String email);

    @Query("SELECT SUM(s.currentAmount) FROM Saving s WHERE s.user.email = :email")
    Double sumAllByUserEmail(String email);
}
