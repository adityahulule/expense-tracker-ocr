package com.expensetracker.controller;

import com.expensetracker.model.Reminder;
import com.expensetracker.service.ReminderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class ReminderController {

    private final ReminderService reminderService;

    public ReminderController(ReminderService reminderService) {
        this.reminderService = reminderService;
    }

    @PostMapping
    public ResponseEntity<Reminder> createReminder(
            @RequestBody Reminder reminder) {

        return ResponseEntity.ok(
                reminderService.createReminder(reminder)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reminder>> getUserReminders(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                reminderService.getUserReminders(userId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reminder> getReminder(
            @PathVariable Long id) {

        return reminderService.getReminderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reminder> updateReminder(
            @PathVariable Long id,
            @RequestBody Reminder reminder) {

        return ResponseEntity.ok(
                reminderService.updateReminder(id, reminder)
        );
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Reminder> completeReminder(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                reminderService.completeReminder(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReminder(
            @PathVariable Long id) {

        reminderService.deleteReminder(id);

        return ResponseEntity.noContent().build();
    }
}