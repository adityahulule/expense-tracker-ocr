package com.expensetracker.repository;

import com.expensetracker.model.GovernmentScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GovernmentSchemeRepository
        extends JpaRepository<GovernmentScheme, Long> {

}