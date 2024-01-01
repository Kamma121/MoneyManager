package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Earning;

import java.util.List;

public interface EarningService {
    List<Earning> addEarnings(List<Earning> earnings);

    List<Earning> getAllEarnings(String email);

    Earning getEarningById(Long id);

    Earning updateEarning(Long id, Earning earning);

    void deleteEarning(Long id);

    Double getTotalEarnings(String email);
}
