package com.expensetracker.controller;

import com.expensetracker.model.UserPermission;
import com.expensetracker.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/permissions")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://expense-tracker-frontend-rqn7.onrender.com"
})
public class PermissionController {

    @Autowired
    private PermissionService permissionService;


    // =====================================================
    // GET FARMER PERMISSIONS
    // =====================================================

    @GetMapping("/{userId}")
    public ResponseEntity<?> getPermissions(
            @PathVariable Long userId) {

        try {

            UserPermission permissions =
                    permissionService.getPermissions(userId);

            return ResponseEntity.ok(permissions);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Unable to load permissions");
        }
    }


    // =====================================================
    // UPDATE FARMER PERMISSIONS
    // =====================================================

    @PutMapping("/{userId}")
    public ResponseEntity<?> updatePermissions(
            @PathVariable Long userId,
            @RequestBody UserPermission permissions) {

        try {

            UserPermission updated =
                    permissionService.updatePermissions(
                            userId,
                            permissions
                    );

            return ResponseEntity.ok(updated);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Unable to update permissions");
        }
    }


    // =====================================================
    // DELETE FARMER PERMISSIONS
    // =====================================================

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deletePermissions(
            @PathVariable Long userId) {

        try {

            permissionService.deletePermissions(userId);

            return ResponseEntity.ok(
                    "Permissions deleted successfully"
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body("Unable to delete permissions");
        }
    }
}