package com.expensetracker.repository;

import com.expensetracker.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // Get notifications for a specific farmer
    List<Notification> findByFarmerIdAndActiveTrueOrderByCreatedAtDesc(
            Long farmerId
    );

    // Get notifications for all farmers
    List<Notification> findByFarmerIdIsNullAndActiveTrueOrderByCreatedAtDesc();

    // Get all active notifications
    List<Notification> findByActiveTrueOrderByCreatedAtDesc();

    // Get unread notifications for a farmer
    List<Notification> findByFarmerIdAndReadFalseAndActiveTrueOrderByCreatedAtDesc(
            Long farmerId
    );
}