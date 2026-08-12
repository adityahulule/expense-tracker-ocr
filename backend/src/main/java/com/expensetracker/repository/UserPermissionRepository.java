package com.expensetracker.repository;

import com.expensetracker.model.UserPermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserPermissionRepository
        extends JpaRepository<UserPermission, Long> {

    Optional<UserPermission> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}