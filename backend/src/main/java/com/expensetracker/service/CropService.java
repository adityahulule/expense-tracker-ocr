package com.expensetracker.service;

import com.expensetracker.model.Crop;
import com.expensetracker.repository.CropRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;


    // =====================================================
    // GET FARMER CROPS
    // =====================================================

    public List<Crop> getCropsByUserId(Long userId) {

        return cropRepository.findByUserId(userId);

    }


    // =====================================================
    // GET CROP BY ID
    // =====================================================

    public Optional<Crop> getCropById(Long id) {

        return cropRepository.findById(id);

    }


    // =====================================================
    // CREATE CROP
    // =====================================================

    public Crop createCrop(Crop crop) {

        crop.setId(null);

        crop.setCreatedAt(
                LocalDateTime.now()
        );

        return cropRepository.save(crop);

    }


    // =====================================================
    // UPDATE CROP
    // =====================================================

    public Crop updateCrop(
            Long id,
            Crop details) {

        return cropRepository
                .findById(id)
                .map(crop -> {

                    crop.setCropName(
                            details.getCropName()
                    );

                    crop.setVariety(
                            details.getVariety()
                    );

                    crop.setSeason(
                            details.getSeason()
                    );

                    crop.setLandArea(
                            details.getLandArea()
                    );

                    crop.setLandUnit(
                            details.getLandUnit()
                    );

                    crop.setSowingDate(
                            details.getSowingDate()
                    );

                    crop.setExpectedHarvestDate(
                            details.getExpectedHarvestDate()
                    );

                    crop.setIrrigationType(
                            details.getIrrigationType()
                    );

                    crop.setStatus(
                            details.getStatus()
                    );

                    crop.setFieldLocation(
                            details.getFieldLocation()
                    );

                    crop.setNotes(
                            details.getNotes()
                    );

                    return cropRepository.save(crop);

                })
                .orElseThrow(
                        () -> new RuntimeException(
                                "Crop not found with id: " + id
                        )
                );

    }


    // =====================================================
    // DELETE CROP
    // =====================================================

    public void deleteCrop(Long id) {

        if (!cropRepository.existsById(id)) {

            throw new RuntimeException(
                    "Crop not found with id: " + id
            );

        }

        cropRepository.deleteById(id);

    }

}