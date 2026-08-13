package com.expensetracker.controller;

import com.expensetracker.model.Crop;
import com.expensetracker.model.UserPermission;
import com.expensetracker.service.CropService;
import com.expensetracker.service.PermissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(
    origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
    }
)
public class CropController {

    @Autowired
    private CropService cropService;

    @Autowired
    private PermissionService permissionService;


    // =====================================================
    // CHECK CROP MANAGEMENT PERMISSION
    // =====================================================

    private boolean hasCropAccess(Long userId) {

        if (userId == null) {
            return false;
        }

        UserPermission permission =
                permissionService.getPermissions(userId);

        return permission.isCropManagementAccess();
    }


    // =====================================================
    // GET ALL CROPS FOR FARMER
    // =====================================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCropsByUser(
            @PathVariable Long userId) {

        if (!hasCropAccess(userId)) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Crop Management access is restricted");
        }

        return ResponseEntity.ok(
                cropService.getCropsByUserId(userId)
        );
    }


    // =====================================================
    // GET CROP BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getCropById(
            @PathVariable Long id) {

        return cropService
                .getCropById(id)
                .map(crop -> {

                    if (!hasCropAccess(crop.getUserId())) {

                        return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body("Crop Management access is restricted");
                    }

                    return ResponseEntity.ok(crop);
                })
                .orElse(
                    ResponseEntity
                            .notFound()
                            .build()
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


            // Check permission

            if (!hasCropAccess(crop.getUserId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Crop Management access is restricted");
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

            if (cropDetails.getUserId() == null) {

                return ResponseEntity
                        .badRequest()
                        .body("userId is required");
            }


            // Check permission

            if (!hasCropAccess(cropDetails.getUserId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Crop Management access is restricted");
            }


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

            Crop crop =
                    cropService
                            .getCropById(id)
                            .orElse(null);

            if (crop == null) {

                return ResponseEntity
                        .notFound()
                        .build();
            }


            // Check permission

            if (!hasCropAccess(crop.getUserId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Crop Management access is restricted");
            }


            cropService.deleteCrop(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                        "Failed to delete crop: "
                        + e.getMessage()
                    );
        }
    }
}