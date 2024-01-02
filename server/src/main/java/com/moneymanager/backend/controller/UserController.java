package com.moneymanager.backend.controller;

import com.moneymanager.backend.form.RoleToUserForm;
import com.moneymanager.backend.form.Summary;
import com.moneymanager.backend.form.UpdateUser;
import com.moneymanager.backend.model.User;
import com.moneymanager.backend.service.EarningService;
import com.moneymanager.backend.service.ExpenseService;
import com.moneymanager.backend.service.SavingService;
import com.moneymanager.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final ExpenseService expenseService;
    private final EarningService earningService;
    private final SavingService savingService;

    @GetMapping("/user")
    public ResponseEntity<User> getAllUsers(Principal principal) {
        return ResponseEntity.ok().body(userService.getUser(principal.getName()));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getTest(@PathVariable Long userId, Principal principal) throws AccessDeniedException {
        User user = userService.getUserById(userId);
        String loggedInUsername = principal.getName();

        if (!user.getUsername().equals(loggedInUsername)) {
            throw new AccessDeniedException("You do not have permission to access this resource");
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/data")
    public ResponseEntity<User> getUserDetails(Principal principal) {
        User user = userService.getUser(principal.getName());
        return ResponseEntity.ok(user);
    }

    @GetMapping("user/statistics")
    public ResponseEntity<Summary> getUserStatistics(Principal principal) {
        String userEmail = principal.getName();
        Summary summary = Summary.builder()
                .totalExpenses(this.expenseService.getTotalExpenses(userEmail))
                .totalEarnings(this.earningService.getTotalEarnings(userEmail))
                .totalSavings(this.savingService.getTotalSavings(userEmail))
                .build();
        return ResponseEntity.ok(summary);
    }

    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return ResponseEntity.ok().body(userService.saveUser(user));
    }

    @PostMapping("/user/add-role")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getEmail(), form.getRole());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/user")
    public ResponseEntity<User> updateUser(@RequestBody UpdateUser user, Principal principal) {
        User currentUser = userService.getUser(principal.getName());
        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setEmail(user.getEmail());
        return ResponseEntity.ok().body(userService.updateUser(currentUser));
    }

}