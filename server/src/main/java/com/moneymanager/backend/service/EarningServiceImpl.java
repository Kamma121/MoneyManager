package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Earning;
import com.moneymanager.backend.repo.EarningRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EarningServiceImpl implements EarningService {
    private final EarningRepo earningRepo;

    @Override
    public List<Earning> addEarnings(List<Earning> earnings) {
        return this.earningRepo.saveAll(earnings);
    }

    @Override
    public List<Earning> getAllEarnings(String email) {
        return this.earningRepo.findAllByUserEmail(email);
    }

    @Override
    public Earning getEarningById(Long id) {
        return this.earningRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("Earning not found"));
    }

    @Override
    public Earning updateEarning(Long id, Earning earning) {
        Earning currentEarning = this.earningRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("Earning not found"));
        currentEarning.setAmount(earning.getAmount());
        currentEarning.setDate(earning.getDate());
        currentEarning.setSource(earning.getSource());
        return this.earningRepo.save(currentEarning);
    }

    @Override
    public void deleteEarning(Long id) {
        Earning currentEarning = this.earningRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("Earning not found"));
        this.earningRepo.delete(currentEarning);
    }

    @Override
    public Double getTotalEarnings(String email) {
        return this.earningRepo.sumAllByUserEmail(email);
    }
}
