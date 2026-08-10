package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000") // Connects to your React frontend
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // 1. GET ALL EXPENSES FOR A SPECIFIC USER
    // Fixes the "₹0" issue by matching the path Ravi's dashboard calls
    @GetMapping("/user/{userId}")
    public List<Expense> getExpensesByUser(@PathVariable Long userId) {
        return expenseService.getExpensesByUserId(userId);
    }

    // 2. CREATE EXPENSE VIA MANUAL FORM
    // Fixes the "Failed to save" error when using the "Add Investment" form
    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        try {
            Expense savedExpense = expenseService.saveExpense(expense);
            return ResponseEntity.ok(savedExpense);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 3. UPLOAD AND PROCESS RECEIPT (OCR)
    // Handles the "Scan Receipt" button logs we saw in your terminal
    @PostMapping("/upload-receipt")
    public ResponseEntity<?> uploadReceipt(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {
        try {
            Expense savedExpense = expenseService.createExpenseFromReceipt(file, userId);
            return ResponseEntity.ok(savedExpense);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing receipt: " + e.getMessage());
        }
    }

    // 4. GET EXPENSE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 5. DELETE AN EXPENSE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    // Add this to handle the 'PUT' request from the frontend
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        try {
            Expense updatedExpense = expenseService.updateExpense(id, expenseDetails);
            return ResponseEntity.ok(updatedExpense);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}