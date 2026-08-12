package com.expensetracker.controller;

import com.expensetracker.model.GovernmentScheme;
import com.expensetracker.service.GovernmentSchemeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class GovernmentSchemeController {

    private final GovernmentSchemeService service;

    public GovernmentSchemeController(
            GovernmentSchemeService service) {

        this.service = service;
    }

    // ===============================
    // GET ALL SCHEMES
    // ===============================

    @GetMapping
    public ResponseEntity<List<GovernmentScheme>> getAllSchemes() {

        return ResponseEntity.ok(
                service.getAllSchemes()
        );
    }

    // ===============================
    // GET SCHEME BY ID
    // ===============================

    @GetMapping("/{id}")
    public ResponseEntity<GovernmentScheme> getSchemeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.getSchemeById(id)
        );
    }

    // ===============================
    // CREATE SCHEME
    // ===============================

    @PostMapping
    public ResponseEntity<GovernmentScheme> createScheme(
            @RequestBody GovernmentScheme scheme) {

        return ResponseEntity.ok(
                service.createScheme(scheme)
        );
    }

    // ===============================
    // UPDATE SCHEME
    // ===============================

    @PutMapping("/{id}")
    public ResponseEntity<GovernmentScheme> updateScheme(
            @PathVariable Long id,
            @RequestBody GovernmentScheme scheme) {

        return ResponseEntity.ok(
                service.updateScheme(id, scheme)
        );
    }

    // ===============================
    // DELETE SCHEME
    // ===============================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteScheme(
            @PathVariable Long id) {

        service.deleteScheme(id);

        return ResponseEntity.ok(
                "Government scheme deleted successfully"
        );
    }
}