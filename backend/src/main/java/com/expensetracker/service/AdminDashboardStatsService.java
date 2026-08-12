package com.expensetracker.service;

import com.expensetracker.repository.UserRepository;
import com.expensetracker.repository.CropRepository;
import com.expensetracker.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminDashboardStatsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        long totalFarmers =
                userRepository.countByRole("USER");

        long totalCrops =
                cropRepository.count();

        long expenseRecords =
                expenseRepository.count();

        // Reminder module complete झाल्यावर इथे actual count घेऊ
        long activeReminders = 0;

        stats.put("totalFarmers", totalFarmers);
        stats.put("totalCrops", totalCrops);
        stats.put("expenseRecords", expenseRecords);
        stats.put("activeReminders", activeReminders);

        return stats;
    }
}