package com.moneymanager.backend.auth;

import com.moneymanager.backend.config.JwtService;
import com.moneymanager.backend.enums.Role;
import com.moneymanager.backend.exception.UserAlreadyExistException;
import com.moneymanager.backend.model.User;
import com.moneymanager.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistException {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new UserAlreadyExistException();
        }
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.FREE)
                .build();
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            boolean userExists = userRepo.findByEmail(request.getEmail()).isPresent();
            if (userExists) {
                throw new BadCredentialsException("Wrong password for email: " + request.getEmail());
            } else {
                throw new UsernameNotFoundException("Email: " + request.getEmail() + " not found.");
            }
        }
        var user = userRepo.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Email: " + request.getEmail() + " not found."));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
