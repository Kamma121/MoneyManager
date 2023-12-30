package com.moneymanager.backend.service;

import com.moneymanager.backend.model.Expense;
import com.moneymanager.backend.model.Saving;
import com.moneymanager.backend.repo.SavingRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService {
    private final SavingRepo savingRepo;

    @Override
    public Saving addSaving(Saving saving) {
        return savingRepo.save(saving);
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
        Optional<Saving> savingOptional = savingRepo.findById(id);
        if (savingOptional.isPresent()) {
            Saving existingSaving = savingOptional.get();
            existingSaving.setName(saving.getName());
            existingSaving.setCurrentAmount(saving.getCurrentAmount());
            existingSaving.setTargetAmount(saving.getTargetAmount());
            return savingRepo.save(existingSaving);
        } else {
            throw new RuntimeException("Expense not found with id " + id);
        }
    }

    @Override
    public void deleteSaving(Long id) {
        savingRepo.deleteById(id);
    }
}
