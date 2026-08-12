package com.expensetracker.controller;

import com.expensetracker.service.AdminDashboardStatsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(
    origins = {
        "http://localhost:3000",
        "https://expense-tracker-ocr-6.onrender.com"
    }
)
public class AdminDashboardStatsController {

    @Autowired
    private AdminDashboardStatsService statsService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Long>>
    getDashboardStats() {

        return ResponseEntity.ok(
            statsService.getDashboardStats()
        );
    }
}