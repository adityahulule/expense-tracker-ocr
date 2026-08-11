package com.expensetracker.repository;

import com.expensetracker.model.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByUserIdOrderByReminderDateAscReminderTimeAsc(Long userId);

    List<Reminder> findByUserIdAndStatusOrderByReminderDateAscReminderTimeAsc(
            Long userId,
            String status
    );
}