package com.moneymanager.backend.controller;

import com.moneymanager.backend.model.Saving;
import com.moneymanager.backend.service.SavingService;
import com.moneymanager.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SavingController {
    private final SavingService savingService;
    private final UserService userService;

    @GetMapping("/savings")
    public ResponseEntity<List<Saving>> getAllSavings(Principal principal) {
        return ResponseEntity.ok(savingService.getAllSavings(principal.getName()));
    }

    @PostMapping("/saving/add")
    public ResponseEntity<List<Saving>> addSavings(@RequestBody List<Saving> savings, Principal principal) {
        for (Saving saving : savings) {
            saving.setUser(userService.getUser(principal.getName()));
        }
        return ResponseEntity.ok(savingService.addSavings(savings));
    }

    @PutMapping("/saving/{savingId}")
    public ResponseEntity<Saving> updateSaving(@PathVariable Long savingId, @RequestBody Saving saving, Principal principal) {
        saving.setUser(userService.getUser(principal.getName()));
        return ResponseEntity.ok(savingService.updateSaving(savingId, saving));
    }

    @DeleteMapping("/saving/{savingId}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long savingId, Principal principal) throws AccessDeniedException {
        if (!principal.getName().equals(savingService.getSavingById(savingId).getUser().getUsername())) {
            throw new AccessDeniedException("You don't have access to this resource");
        }
        savingService.deleteSaving(savingId);
        return ResponseEntity.ok("Expense with id: " + savingId + " was successfully deleted.");
    }
}
