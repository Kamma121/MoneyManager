package com.moneymanager.backend.exception;

public class UserAlreadyExistException extends Exception {
    public UserAlreadyExistException() {
        super("User already exist");
    }
}
