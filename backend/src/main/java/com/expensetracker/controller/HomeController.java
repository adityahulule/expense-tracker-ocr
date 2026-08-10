package com.expensetracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Expense Tracker Backend API");
        response.put("status", "Running");
        response.put("version", "1.0.0");
        response.put("endpoints", Map.of(
            "api", "http://localhost:8080/api/expenses",
            "h2-console", "http://localhost:8080/h2-console",
            "frontend", "http://localhost:3000"
        ));
        response.put("note", "This is the backend API. Please use the frontend at http://localhost:3000");
        return ResponseEntity.ok(response);
    }
}

