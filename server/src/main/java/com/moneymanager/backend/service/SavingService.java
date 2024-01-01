package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Saving;

import java.util.List;

public interface SavingService {
    Saving addSaving(Saving savings);

    List<Saving> getAllSavings(String email);

    Saving getSavingById(Long id);

    Saving updateSaving(Long id, Saving saving);

    void deleteSaving(Long id);

    Double getTotalSavings(String email);
}
