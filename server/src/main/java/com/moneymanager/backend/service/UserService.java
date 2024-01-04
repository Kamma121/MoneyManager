package com.moneymanager.backend.service;

import com.moneymanager.backend.enums.Role;
import com.moneymanager.backend.model.User;

public interface UserService {
    User saveUser(User user);

    void addRoleToUser(String email, Role role);

    User getUser(String email);

    User getUserById(Long id);

    User updateUser(User user);
}
