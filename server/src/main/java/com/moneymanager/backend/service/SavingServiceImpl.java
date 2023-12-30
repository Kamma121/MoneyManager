package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Saving;
import com.moneymanager.backend.repo.SavingRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService {
    private final SavingRepo savingRepo;

    @Override
    public List<Saving> addSavings(List<Saving> savings) {
        return savingRepo.saveAll(savings);
    }

    @Override
    public List<Saving> getAllSavings(String email) {
        return savingRepo.findAllByUserEmail(email);
    }

    @Override
    public Saving getSavingById(Long id) {
        return savingRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("Id not found."));
    }

    @Override
    public Saving updateSaving(Long id, Saving saving) {
        Saving currentSaving = savingRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("Id not found."));
        saving.setName(currentSaving.getName());
        saving.setCurrentAmount(currentSaving.getCurrentAmount());
        saving.setTargetAmount(currentSaving.getTargetAmount());
        return savingRepo.save(currentSaving);
    }

    @Override
    public void deleteSaving(Long id) {
        savingRepo.deleteById(id);
    }
}
