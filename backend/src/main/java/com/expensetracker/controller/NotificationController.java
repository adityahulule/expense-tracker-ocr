package com.expensetracker.controller;

import com.expensetracker.model.Notification;
import com.expensetracker.service.NotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService =
                notificationService;
    }


    // ==========================================
    // ADMIN - CREATE NOTIFICATION
    // ==========================================

    @PostMapping
    public ResponseEntity<Notification> createNotification(
            @RequestBody Notification notification) {

        return ResponseEntity.ok(
                notificationService.createNotification(
                        notification
                )
        );
    }


    // ==========================================
    // ADMIN - GET ALL NOTIFICATIONS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {

        return ResponseEntity.ok(
                notificationService.getAllNotifications()
        );
    }


    // ==========================================
    // GET ACTIVE NOTIFICATIONS
    // ==========================================

    @GetMapping("/active")
    public ResponseEntity<List<Notification>> getActiveNotifications() {

        return ResponseEntity.ok(
                notificationService.getActiveNotifications()
        );
    }


    // ==========================================
    // FARMER - GET NOTIFICATIONS
    // ==========================================

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Notification>> getFarmerNotifications(
            @PathVariable Long farmerId) {

        return ResponseEntity.ok(
                notificationService.getFarmerNotifications(
                        farmerId
                )
        );
    }


    // ==========================================
    // FARMER - GET UNREAD NOTIFICATIONS
    // ==========================================

    @GetMapping("/farmer/{farmerId}/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(
            @PathVariable Long farmerId) {

        return ResponseEntity.ok(
                notificationService.getUnreadNotifications(
                        farmerId
                )
        );
    }


    // ==========================================
    // GET NOTIFICATION BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.getNotificationById(
                        id
                )
        );
    }


    // ==========================================
    // MARK AS READ
    // ==========================================

    @PutMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.markAsRead(id)
        );
    }


    // ==========================================
    // MARK AS UNREAD
    // ==========================================

    @PutMapping("/{id}/unread")
    public ResponseEntity<Notification> markAsUnread(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.markAsUnread(id)
        );
    }


    // ==========================================
    // UPDATE NOTIFICATION
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(
            @PathVariable Long id,
            @RequestBody Notification notification) {

        return ResponseEntity.ok(
                notificationService.updateNotification(
                        id,
                        notification
                )
        );
    }


    // ==========================================
    // DELETE NOTIFICATION
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.ok(
                "Notification deleted successfully"
        );
    }


    // ==========================================
    // DEACTIVATE NOTIFICATION
    // ==========================================

    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Notification> deactivateNotification(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.deactivateNotification(
                        id
                )
        );
    }


    // ==========================================
    // ACTIVATE NOTIFICATION
    // ==========================================

    @PutMapping("/{id}/activate")
    public ResponseEntity<Notification> activateNotification(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                notificationService.activateNotification(
                        id
                )
        );
    }
}