package com.expensetracker.service;

import com.expensetracker.model.Reminder;
import com.expensetracker.repository.ReminderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReminderService {

    private final ReminderRepository reminderRepository;

    public ReminderService(ReminderRepository reminderRepository) {
        this.reminderRepository = reminderRepository;
    }

    public Reminder createReminder(Reminder reminder) {
        if (reminder.getStatus() == null || reminder.getStatus().isEmpty()) {
            reminder.setStatus("PENDING");
        }

        if (reminder.getPriority() == null || reminder.getPriority().isEmpty()) {
            reminder.setPriority("MEDIUM");
        }

        return reminderRepository.save(reminder);
    }

    public List<Reminder> getUserReminders(Long userId) {
        return reminderRepository
                .findByUserIdOrderByReminderDateAscReminderTimeAsc(userId);
    }

    public Optional<Reminder> getReminderById(Long id) {
        return reminderRepository.findById(id);
    }

    public Reminder updateReminder(Long id, Reminder updatedReminder) {

        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        reminder.setTitle(updatedReminder.getTitle());
        reminder.setCategory(updatedReminder.getCategory());
        reminder.setCropType(updatedReminder.getCropType());
        reminder.setReminderDate(updatedReminder.getReminderDate());
        reminder.setReminderTime(updatedReminder.getReminderTime());
        reminder.setDescription(updatedReminder.getDescription());
        reminder.setPriority(updatedReminder.getPriority());
        reminder.setStatus(updatedReminder.getStatus());

        return reminderRepository.save(reminder);
    }

    public void deleteReminder(Long id) {
        reminderRepository.deleteById(id);
    }

    public Reminder completeReminder(Long id) {

        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reminder not found"));

        reminder.setStatus("COMPLETED");

        return reminderRepository.save(reminder);
    }
}