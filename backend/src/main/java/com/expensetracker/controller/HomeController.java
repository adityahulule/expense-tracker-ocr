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

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Expense Tracker Backend API"
        );

        response.put(
                "status",
                "Running"
        );

        response.put(
                "version",
                "1.0.0"
        );

        response.put(
                "endpoints",
                Map.of(
                        "api",
                        "/api/expenses",

                        "admin",
                        "/api/admin",

                        "crops",
                        "/api/crops",

                        "schemes",
                        "/api/schemes",

                        "notifications",
                        "/api/notifications"
                )
        );

        response.put(
                "note",
                "Expense Tracker Backend API is running successfully."
        );

        return ResponseEntity.ok(response);
    }
}