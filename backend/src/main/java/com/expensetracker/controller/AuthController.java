package com.expensetracker.controller;

import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allows React to talk to Java
public class AuthController {

    @Autowired
    private UserRepository userRepository;

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody User user) {

    System.out.println("===== REGISTER API CALLED =====");
    System.out.println(user);

    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        return ResponseEntity.badRequest().body("Error: Email is already taken!");
    }

    User savedUser = userRepository.save(user);

    System.out.println("Saved User: " + savedUser);

    return ResponseEntity.ok(savedUser);
}
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {

    String email = credentials.get("email");
    String password = credentials.get("password");

    System.out.println("Email: " + email);
    System.out.println("Password entered: " + password);

    Optional<User> user = userRepository.findByEmail(email);

    if (user.isEmpty()) {
        System.out.println("User not found");
        return ResponseEntity.status(401).body("User not found");
    }

    System.out.println("Stored password: " + user.get().getPassword());

    if (user.get().getPassword().equals(password)) {
        System.out.println("Login Success");
        return ResponseEntity.ok(user.get());
    }

    System.out.println("Password mismatch");
    return ResponseEntity.status(401).body("Invalid email or password");

}
}
