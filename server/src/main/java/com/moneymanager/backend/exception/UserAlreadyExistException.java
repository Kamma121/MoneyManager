package com.moneymanager.backend.exception;

public class UserAlreadyExistException extends Throwable {
    public UserAlreadyExistException() {
        super("User already exist");
    }
}
