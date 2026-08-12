package com.expensetracker.service;

import com.expensetracker.model.Notification;
import com.expensetracker.repository.NotificationRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository) {

        this.notificationRepository =
                notificationRepository;
    }


    // ==========================================
    // CREATE NOTIFICATION
    // ==========================================

    public Notification createNotification(
            Notification notification) {

        if (notification.getType() == null ||
                notification.getType().trim().isEmpty()) {

            notification.setType("GENERAL");
        }

        notification.setRead(false);
        notification.setActive(true);

        return notificationRepository.save(notification);
    }


    // ==========================================
    // GET ALL NOTIFICATIONS
    // ==========================================

    public List<Notification> getAllNotifications() {

        return notificationRepository
                .findAll();
    }


    // ==========================================
    // GET ACTIVE NOTIFICATIONS
    // ==========================================

    public List<Notification> getActiveNotifications() {

        return notificationRepository
                .findByActiveTrueOrderByCreatedAtDesc();
    }


    // ==========================================
    // GET FARMER NOTIFICATIONS
    // ==========================================

    public List<Notification> getFarmerNotifications(
            Long farmerId) {

        List<Notification> notifications =
                notificationRepository
                        .findByFarmerIdAndActiveTrueOrderByCreatedAtDesc(
                                farmerId
                        );

        List<Notification> allFarmerNotifications =
                notificationRepository
                        .findByFarmerIdIsNullAndActiveTrueOrderByCreatedAtDesc();

        notifications.addAll(
                allFarmerNotifications
        );

        return notifications;
    }


    // ==========================================
    // GET UNREAD NOTIFICATIONS
    // ==========================================

    public List<Notification> getUnreadNotifications(
            Long farmerId) {

        List<Notification> notifications =
                notificationRepository
                        .findByFarmerIdAndReadFalseAndActiveTrueOrderByCreatedAtDesc(
                                farmerId
                        );

        List<Notification> allNotifications =
                notificationRepository
                        .findByFarmerIdIsNullAndActiveTrueOrderByCreatedAtDesc();

        allNotifications.removeIf(
                Notification::isRead
        );

        notifications.addAll(
                allNotifications
        );

        return notifications;
    }


    // ==========================================
    // GET NOTIFICATION BY ID
    // ==========================================

    public Notification getNotificationById(
            Long id) {

        return notificationRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Notification not found"
                        )
                );
    }


    // ==========================================
    // MARK AS READ
    // ==========================================

    public Notification markAsRead(Long id) {

        Notification notification =
                getNotificationById(id);

        notification.setRead(true);

        return notificationRepository
                .save(notification);
    }


    // ==========================================
    // MARK AS UNREAD
    // ==========================================

    public Notification markAsUnread(Long id) {

        Notification notification =
                getNotificationById(id);

        notification.setRead(false);

        return notificationRepository
                .save(notification);
    }


    // ==========================================
    // UPDATE NOTIFICATION
    // ==========================================

    public Notification updateNotification(
            Long id,
            Notification newNotification) {

        Notification existing =
                getNotificationById(id);

        existing.setFarmerId(
                newNotification.getFarmerId()
        );

        existing.setTitle(
                newNotification.getTitle()
        );

        existing.setMessage(
                newNotification.getMessage()
        );

        existing.setType(
                newNotification.getType()
        );

        existing.setActive(
                newNotification.isActive()
        );

        return notificationRepository
                .save(existing);
    }


    // ==========================================
    // DELETE NOTIFICATION
    // ==========================================

    public void deleteNotification(Long id) {

        if (!notificationRepository
                .existsById(id)) {

            throw new RuntimeException(
                    "Notification not found"
            );
        }

        notificationRepository
                .deleteById(id);
    }


    // ==========================================
    // DEACTIVATE NOTIFICATION
    // ==========================================

    public Notification deactivateNotification(
            Long id) {

        Notification notification =
                getNotificationById(id);

        notification.setActive(false);

        return notificationRepository
                .save(notification);
    }


    // ==========================================
    // ACTIVATE NOTIFICATION
    // ==========================================

    public Notification activateNotification(
            Long id) {

        Notification notification =
                getNotificationById(id);

        notification.setActive(true);

        return notificationRepository
                .save(notification);
    }
}