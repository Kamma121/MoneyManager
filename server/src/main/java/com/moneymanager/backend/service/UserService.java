package com.moneymanager.backend.service;

import com.moneymanager.backend.enums.Role;
import com.moneymanager.backend.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    void addRoleToUser(String email, Role role);

    User getUser(String email);

    User getUserById(Long id);

    List<User> getAllUsers();

    User updateUser(User user);
}
