package com.expensetracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Farmer ID
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String cropName;

    private String variety;

    private String season;

    private Double landArea;

    private String landUnit;

    private LocalDate sowingDate;

    private LocalDate expectedHarvestDate;

    private String irrigationType;

    private String status;

    private String fieldLocation;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private LocalDateTime createdAt;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public Crop() {
    }

    // =====================================================
    // GETTERS AND SETTERS
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getVariety() {
        return variety;
    }

    public void setVariety(String variety) {
        this.variety = variety;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public Double getLandArea() {
        return landArea;
    }

    public void setLandArea(Double landArea) {
        this.landArea = landArea;
    }

    public String getLandUnit() {
        return landUnit;
    }

    public void setLandUnit(String landUnit) {
        this.landUnit = landUnit;
    }

    public LocalDate getSowingDate() {
        return sowingDate;
    }

    public void setSowingDate(LocalDate sowingDate) {
        this.sowingDate = sowingDate;
    }

    public LocalDate getExpectedHarvestDate() {
        return expectedHarvestDate;
    }

    public void setExpectedHarvestDate(
            LocalDate expectedHarvestDate) {

        this.expectedHarvestDate =
                expectedHarvestDate;
    }

    public String getIrrigationType() {
        return irrigationType;
    }

    public void setIrrigationType(String irrigationType) {
        this.irrigationType = irrigationType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFieldLocation() {
        return fieldLocation;
    }

    public void setFieldLocation(String fieldLocation) {
        this.fieldLocation = fieldLocation;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt) {

        this.createdAt = createdAt;
    }
}