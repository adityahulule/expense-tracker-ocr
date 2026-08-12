package com.expensetracker.controller;

import com.expensetracker.model.Crop;
import com.expensetracker.service.CropService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(
    origins = {
        "http://localhost:3000",
        "https://expense-tracker-ocr-6.onrender.com"
    }
)
public class CropController {

    @Autowired
    private CropService cropService;


    // =====================================================
    // GET ALL CROPS FOR FARMER
    // =====================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Crop>>
    getCropsByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                cropService.getCropsByUserId(userId)
        );

    }


    // =====================================================
    // GET CROP BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<Crop>
    getCropById(
            @PathVariable Long id) {

        return cropService
                .getCropById(id)
                .map(ResponseEntity::ok)
                .orElse(
                    ResponseEntity.notFound().build()
                );

    }


    // =====================================================
    // CREATE CROP
    // =====================================================

    @PostMapping
    public ResponseEntity<?> createCrop(
            @RequestBody Crop crop) {

        try {

            if (crop.getUserId() == null) {

                return ResponseEntity
                        .badRequest()
                        .body("userId is required");

            }

            if (crop.getCropName() == null ||
                crop.getCropName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Crop name is required");

            }

            Crop savedCrop =
                    cropService.createCrop(crop);

            return ResponseEntity.ok(savedCrop);

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                        "Failed to create crop: "
                        + e.getMessage()
                    );

        }

    }


    // =====================================================
    // UPDATE CROP
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCrop(
            @PathVariable Long id,
            @RequestBody Crop cropDetails) {

        try {

            Crop updatedCrop =
                    cropService.updateCrop(
                            id,
                            cropDetails
                    );

            return ResponseEntity.ok(
                    updatedCrop
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                        "Failed to update crop: "
                        + e.getMessage()
                    );

        }

    }


    // =====================================================
    // DELETE CROP
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCrop(
            @PathVariable Long id) {

        try {

            cropService.deleteCrop(id);

            return ResponseEntity.noContent()
                    .build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();

        }

    }

}