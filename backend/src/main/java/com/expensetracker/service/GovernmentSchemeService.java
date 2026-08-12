package com.expensetracker.service;

import com.expensetracker.model.GovernmentScheme;
import com.expensetracker.repository.GovernmentSchemeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GovernmentSchemeService {

    private final GovernmentSchemeRepository repository;

    public GovernmentSchemeService(
            GovernmentSchemeRepository repository) {
        this.repository = repository;
    }

    // ===============================
    // GET ALL SCHEMES
    // ===============================

    public List<GovernmentScheme> getAllSchemes() {
        return repository.findAll();
    }

    // ===============================
    // GET SCHEME BY ID
    // ===============================

    public GovernmentScheme getSchemeById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Government scheme not found with id: " + id
                        )
                );
    }

    // ===============================
    // CREATE SCHEME
    // ===============================

    public GovernmentScheme createScheme(
            GovernmentScheme scheme) {

        return repository.save(scheme);
    }

    // ===============================
    // UPDATE SCHEME
    // ===============================

    public GovernmentScheme updateScheme(
            Long id,
            GovernmentScheme updatedScheme) {

        GovernmentScheme existingScheme =
                getSchemeById(id);

        existingScheme.setSchemeName(
                updatedScheme.getSchemeName()
        );

        existingScheme.setDescription(
                updatedScheme.getDescription()
        );

        existingScheme.setEligibility(
                updatedScheme.getEligibility()
        );

        existingScheme.setBenefits(
                updatedScheme.getBenefits()
        );

        existingScheme.setDepartment(
                updatedScheme.getDepartment()
        );

        existingScheme.setYear(
                updatedScheme.getYear()
        );

        existingScheme.setOfficialLink(
                updatedScheme.getOfficialLink()
        );

        existingScheme.setStatus(
                updatedScheme.getStatus()
        );

        return repository.save(existingScheme);
    }

    // ===============================
    // DELETE SCHEME
    // ===============================

    public void deleteScheme(Long id) {

        if (!repository.existsById(id)) {

            throw new RuntimeException(
                    "Government scheme not found with id: " + id
            );
        }

        repository.deleteById(id);
    }
}