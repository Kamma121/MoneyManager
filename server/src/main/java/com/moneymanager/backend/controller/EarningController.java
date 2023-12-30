package com.moneymanager.backend.controller;

import com.moneymanager.backend.model.Earning;
import com.moneymanager.backend.service.EarningService;
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
public class EarningController {
    private final EarningService earningService;
    private final UserService userService;

    @GetMapping("/earnings")
    public ResponseEntity<List<Earning>> getAllEarnings(Principal principal) {
        return ResponseEntity.ok(earningService.getAllEarnings(principal.getName()));
    }

    @PostMapping("/earning/add")
    public ResponseEntity<List<Earning>> addEarnings(@RequestBody List<Earning> earnings, Principal principal) {
        for (Earning earning : earnings) {
            earning.setUser(userService.getUser(principal.getName()));
        }
        return ResponseEntity.ok(earningService.addEarnings(earnings));
    }

    @PutMapping("/earning/{earningId}")
    public ResponseEntity<Earning> updateEarning(@PathVariable Long earningId, @RequestBody Earning earning, Principal principal) {
        earning.setUser(userService.getUser(principal.getName()));
        return ResponseEntity.ok(earningService.updateEarning(earningId, earning));
    }

    @DeleteMapping("/earning/{earningId}")
    public ResponseEntity<?> deleteEarning(@PathVariable Long earningId, Principal principal) throws AccessDeniedException {
        if (!principal.getName().equals(earningService.getEarningById(earningId).getUser().getUsername())) {
            throw new AccessDeniedException("You don't have access to this resource");
        }
        earningService.deleteEarning(earningId);
        return ResponseEntity.ok("Expense with id: " + earningId + " was successfully deleted.");
    }
}
