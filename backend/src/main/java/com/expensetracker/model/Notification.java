package com.expensetracker.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // null = all farmers
    // value = specific farmer
    @Column(name = "farmer_id")
    private Long farmerId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false)
    private String type;

    // IMPORTANT:
    // "read" is a MySQL reserved keyword.
    // Therefore database column is named "is_read".
    @Column(name = "is_read", nullable = false)
    private boolean read = false;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;


    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Notification() {
    }


    // ==========================================
    // PRE PERSIST
    // ==========================================

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

    }


    // ==========================================
    // GETTERS
    // ==========================================

    public Long getId() {
        return id;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public String getType() {
        return type;
    }

    public boolean isRead() {
        return read;
    }

    public boolean isActive() {
        return active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    // ==========================================
    // SETTERS
    // ==========================================

    public void setId(Long id) {
        this.id = id;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    // ==========================================
    // TOSTRING
    // ==========================================

    @Override
    public String toString() {

        return "Notification{" +
                "id=" + id +
                ", farmerId=" + farmerId +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", type='" + type + '\'' +
                ", read=" + read +
                ", active=" + active +
                ", createdAt=" + createdAt +
                '}';
    }
}