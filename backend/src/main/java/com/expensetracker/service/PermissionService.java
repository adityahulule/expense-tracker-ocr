package com.expensetracker.service;

import com.expensetracker.model.UserPermission;
import com.expensetracker.repository.UserPermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PermissionService {

    @Autowired
    private UserPermissionRepository permissionRepository;


    // =====================================================
    // GET PERMISSIONS
    // =====================================================

    public UserPermission getPermissions(Long userId) {

        Optional<UserPermission> existing =
                permissionRepository.findByUserId(userId);

        if (existing.isPresent()) {
            return existing.get();
        }

        // Create default permissions if not found
        UserPermission permission = createDefaultPermissions(userId);

        return permissionRepository.save(permission);
    }


    // =====================================================
    // CREATE DEFAULT PERMISSIONS
    // =====================================================

    public UserPermission createDefaultPermissions(Long userId) {

        UserPermission permission = new UserPermission();

        permission.setUserId(userId);

        /*
         * New farmers get access to all features
         * by default.
         */

        permission.setExpenseAccess(true);
        permission.setOcrAccess(true);
        permission.setReminderAccess(true);
        permission.setCropManagementAccess(true);
        permission.setAnalyticsAccess(true);
        permission.setSchemeAccess(true);

        return permission;
    }


    // =====================================================
    // UPDATE PERMISSIONS
    // =====================================================

    public UserPermission updatePermissions(
            Long userId,
            UserPermission newPermissions) {

        UserPermission permission;

        Optional<UserPermission> existing =
                permissionRepository.findByUserId(userId);

        if (existing.isPresent()) {

            permission = existing.get();

        } else {

            permission = createDefaultPermissions(userId);
        }


        /*
         * Always keep the correct farmer ID.
         */

        permission.setUserId(userId);


        permission.setExpenseAccess(
                newPermissions.isExpenseAccess()
        );

        permission.setOcrAccess(
                newPermissions.isOcrAccess()
        );

        permission.setReminderAccess(
                newPermissions.isReminderAccess()
        );

        permission.setCropManagementAccess(
                newPermissions.isCropManagementAccess()
        );

        permission.setAnalyticsAccess(
                newPermissions.isAnalyticsAccess()
        );

        permission.setSchemeAccess(
                newPermissions.isSchemeAccess()
        );


        return permissionRepository.save(permission);
    }


    // =====================================================
    // DELETE PERMISSIONS
    // =====================================================

    public void deletePermissions(Long userId) {

        Optional<UserPermission> existing =
                permissionRepository.findByUserId(userId);

        existing.ifPresent(permission ->
                permissionRepository.delete(permission)
        );
    }
}