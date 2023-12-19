package com.moneymanager.backend.form;

import com.moneymanager.backend.enums.Role;

public class RoleToUserForm {
    private String email;
    private Role role;

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}
