package com.expensetracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_permissions")
public class UserPermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Farmer/User ID
     */
    @Column(nullable = false, unique = true)
    private Long userId;

    /*
     * Feature permissions
     */

    @Column(nullable = false)
    private boolean expenseAccess = true;

    @Column(nullable = false)
    private boolean ocrAccess = true;

    @Column(nullable = false)
    private boolean reminderAccess = true;

    @Column(nullable = false)
    private boolean cropManagementAccess = true;

    @Column(nullable = false)
    private boolean analyticsAccess = true;

    @Column(nullable = false)
    private boolean schemeAccess = true;


    // =========================
    // CONSTRUCTOR
    // =========================

    public UserPermission() {
    }


    // =========================
    // GETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public boolean isExpenseAccess() {
        return expenseAccess;
    }

    public boolean isOcrAccess() {
        return ocrAccess;
    }

    public boolean isReminderAccess() {
        return reminderAccess;
    }

    public boolean isCropManagementAccess() {
        return cropManagementAccess;
    }

    public boolean isAnalyticsAccess() {
        return analyticsAccess;
    }

    public boolean isSchemeAccess() {
        return schemeAccess;
    }


    // =========================
    // SETTERS
    // =========================

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setExpenseAccess(boolean expenseAccess) {
        this.expenseAccess = expenseAccess;
    }

    public void setOcrAccess(boolean ocrAccess) {
        this.ocrAccess = ocrAccess;
    }

    public void setReminderAccess(boolean reminderAccess) {
        this.reminderAccess = reminderAccess;
    }

    public void setCropManagementAccess(boolean cropManagementAccess) {
        this.cropManagementAccess = cropManagementAccess;
    }

    public void setAnalyticsAccess(boolean analyticsAccess) {
        this.analyticsAccess = analyticsAccess;
    }

    public void setSchemeAccess(boolean schemeAccess) {
        this.schemeAccess = schemeAccess;
    }


    // =========================
    // TOSTRING
    // =========================

    @Override
    public String toString() {

        return "UserPermission{" +
                "id=" + id +
                ", userId=" + userId +
                ", expenseAccess=" + expenseAccess +
                ", ocrAccess=" + ocrAccess +
                ", reminderAccess=" + reminderAccess +
                ", cropManagementAccess=" + cropManagementAccess +
                ", analyticsAccess=" + analyticsAccess +
                ", schemeAccess=" + schemeAccess +
                '}';
    }
}