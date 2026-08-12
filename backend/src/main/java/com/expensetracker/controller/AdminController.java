package com.expensetracker.controller;

import com.expensetracker.model.User;
import com.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class AdminController {

    @Autowired
    private UserRepository userRepository;


    // ============================================
    // GET ALL FARMERS
    // ============================================

    @GetMapping("/farmers")
    public ResponseEntity<?> getAllFarmers() {

        try {

            List<User> farmers =
                    userRepository.findByRole("USER");

            return ResponseEntity.ok(farmers);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Unable to fetch farmers");
        }
    }


    // ============================================
    // GET FARMER BY ID
    // ============================================

    @GetMapping("/farmers/{id}")
    public ResponseEntity<?> getFarmerById(
            @PathVariable Long id) {

        return userRepository.findById(id)
                .map(user -> {

                    if (!"USER".equalsIgnoreCase(
                            user.getRole())) {

                        return ResponseEntity
                                .badRequest()
                                .body("User is not a farmer");
                    }

                    return ResponseEntity.ok(user);
                })
                .orElse(
                    ResponseEntity
                        .notFound()
                        .build()
                );
    }
}