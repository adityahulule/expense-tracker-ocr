package com.expensetracker.repository;

import com.expensetracker.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropRepository
        extends JpaRepository<Crop, Long> {

    List<Crop> findByUserId(Long userId);

}