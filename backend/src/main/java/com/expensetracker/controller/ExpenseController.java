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
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;


    // =====================================================
    // ADMIN - GET ALL EXPENSES
    // Used by OCR Monitoring and System Analytics
    // =====================================================

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {

        return ResponseEntity.ok(
                expenseService.getAllExpenses()
        );
    }


    // =====================================================
    // GET ALL EXPENSES FOR SPECIFIC USER
    // =====================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Expense>> getExpensesByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                expenseService.getExpensesByUserId(userId)
        );
    }


    // =====================================================
    // CREATE EXPENSE
    // =====================================================

    @PostMapping
    public ResponseEntity<Expense> createExpense(
            @RequestBody Expense expense) {

        try {

            Expense savedExpense =
                    expenseService.saveExpense(
                            expense
                    );

            return ResponseEntity.ok(
                    savedExpense
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }


    // =====================================================
    // OCR - UPLOAD RECEIPT
    // =====================================================

    @PostMapping("/upload-receipt")
    public ResponseEntity<?> uploadReceipt(

            @RequestParam("file")
            MultipartFile file,

            @RequestParam("userId")
            Long userId) {

        try {

            Expense savedExpense =
                    expenseService
                            .createExpenseFromReceipt(
                                    file,
                                    userId
                            );

            return ResponseEntity.ok(
                    savedExpense
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body(
                        "Error processing receipt: "
                        + e.getMessage()
                    );
        }
    }


    // =====================================================
    // GET EXPENSE BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(
            @PathVariable Long id) {

        return expenseService
                .getExpenseById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );
    }


    // =====================================================
    // UPDATE EXPENSE
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(

            @PathVariable Long id,

            @RequestBody Expense expenseDetails) {

        try {

            Expense updatedExpense =
                    expenseService.updateExpense(
                            id,
                            expenseDetails
                    );

            return ResponseEntity.ok(
                    updatedExpense
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .build();
        }
    }


    // =====================================================
    // DELETE EXPENSE
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id) {

        expenseService.deleteExpense(id);

        return ResponseEntity.noContent()
                .build();
    }

}