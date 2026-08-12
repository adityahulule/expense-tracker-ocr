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
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        System.out.println("===== REGISTER API CALLED =====");
        System.out.println("Name: " + user.getFullName());
        System.out.println("Email: " + user.getEmail());

        // Check whether email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already taken!");
        }

        /*
         * IMPORTANT SECURITY RULE
         *
         * Public registration can ONLY create
         * a Farmer/User account.
         *
         * Even if someone sends:
         *
         * "role": "ADMIN"
         *
         * from Postman or React,
         * we ignore it.
         */

        user.setRole("USER");

        User savedUser = userRepository.save(user);

        System.out.println("Saved User: " + savedUser);

        return ResponseEntity.ok(savedUser);
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> credentials) {

        System.out.println("===== LOGIN API CALLED =====");

        String email = credentials.get("email");
        String password = credentials.get("password");
        String loginType = credentials.get("loginType");


        System.out.println("Email: " + email);
        System.out.println("Login Type: " + loginType);


        // -------------------------------------------------
        // Validate input
        // -------------------------------------------------

        if (email == null || password == null) {

            return ResponseEntity
                    .badRequest()
                    .body("Email and password are required.");
        }


        // -------------------------------------------------
        // Find user
        // -------------------------------------------------

        Optional<User> optionalUser =
                userRepository.findByEmail(email);


        if (optionalUser.isEmpty()) {

            System.out.println("User not found");

            return ResponseEntity
                    .status(401)
                    .body("User not found");
        }


        User user = optionalUser.get();


        // -------------------------------------------------
        // Check password
        // -------------------------------------------------

        System.out.println(
                "Stored password: " +
                user.getPassword()
        );


        if (!user.getPassword().equals(password)) {

            System.out.println("Password mismatch");

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }


        // -------------------------------------------------
        // Check actual database role
        // -------------------------------------------------

        String actualRole = user.getRole();

        System.out.println(
                "Database Role: " +
                actualRole
        );


        // =================================================
        // ADMIN LOGIN
        // =================================================

        if ("ADMIN".equalsIgnoreCase(actualRole)) {

            /*
             * If Admin account is trying to login
             * through Farmer option, reject it.
             */

            if (loginType != null &&
                    !"ADMIN".equalsIgnoreCase(loginType)) {

                return ResponseEntity
                        .status(403)
                        .body(
                            "This is an Admin account. " +
                            "Please select Admin Login."
                        );
            }

            System.out.println(
                    "ADMIN LOGIN SUCCESS"
            );

            return ResponseEntity.ok(user);
        }


        // =================================================
        // FARMER / USER LOGIN
        // =================================================

        if ("USER".equalsIgnoreCase(actualRole)) {

            /*
             * If Farmer account is trying to login
             * through Admin option, reject it.
             */

            if (loginType != null &&
                    !"FARMER".equalsIgnoreCase(loginType)) {

                return ResponseEntity
                        .status(403)
                        .body(
                            "This is a Farmer account. " +
                            "Please select Farmer Login."
                        );
            }

            System.out.println(
                    "FARMER LOGIN SUCCESS"
            );

            return ResponseEntity.ok(user);
        }


        // =================================================
        // UNKNOWN ROLE
        // =================================================

        return ResponseEntity
                .status(403)
                .body("Invalid user role.");
    }
}