package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.expensetracker.service.OCRService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private OCRService ocrService;

    public Expense saveExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

    public List<Expense> getExpensesByUserId(Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    public Expense createExpense(Expense expense) {
        if (expense.getCreatedAt() == null) {
            expense.setCreatedAt(LocalDateTime.now());
        }
        return expenseRepository.save(expense);
    }
    

    // --- OCR LOGIC ---
    public Expense createExpenseFromReceipt(MultipartFile file, Long userId) throws Exception {
        String rawText = ocrService.extractTextFromImage(file);
        
        BigDecimal amount = extractAmount(rawText);
        String merchant = extractMerchant(rawText);
        String category = extractCategory(rawText);
        
        Expense expense = new Expense();
        expense.setUserId(userId);
        expense.setAmount(amount);
        expense.setMerchantName(merchant);
        expense.setCategory(category);
        expense.setCropType(extractCropType(rawText));
        expense.setSeason(extractSeason(rawText));
        
        // Ensure description is never blank for validation
        expense.setDescription(category + " purchase at " + merchant); 
        
        expense.setExpenseDate(LocalDateTime.now());
        expense.setCreatedAt(LocalDateTime.now());

        return expenseRepository.save(expense);
    }

    public Expense updateExpense(Long id, Expense details) {
        return expenseRepository.findById(id).map(expense -> {
            expense.setDescription(details.getDescription());
            expense.setAmount(details.getAmount());
            expense.setCategory(details.getCategory());
            expense.setCropType(details.getCropType());
            expense.setSeason(details.getSeason());
            expense.setMerchantName(details.getMerchantName());
            // Do not update user_id or created_at to keep data integrity
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new RuntimeException("Expense not found with id " + id));
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    // --- MISSING METHODS TO FIX CONTROLLER ERRORS ---

    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findAll().stream()
                .filter(e -> e.getCategory() != null && e.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    public BigDecimal getTotalExpenses() {
        return expenseRepository.findAll().stream()
                .map(Expense::getAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public List<Expense> getExpensesByDateRange(LocalDateTime start, LocalDateTime end) {
        return expenseRepository.findAll().stream()
                .filter(e -> e.getExpenseDate() != null && 
                        !e.getExpenseDate().isBefore(start) && 
                        !e.getExpenseDate().isAfter(end))
                .collect(Collectors.toList());
    }

    // --- OCR HELPERS ---

    private BigDecimal extractAmount(String text) {
        Pattern totalPattern = Pattern.compile("(?i)TOTAL[:\\s]*[₹\\$]?\\s*(\\d+\\.\\d{2})");
        Matcher totalMatcher = totalPattern.matcher(text);
        if (totalMatcher.find()) return new BigDecimal(totalMatcher.group(1));

        Pattern anyDecimalPattern = Pattern.compile("(\\d+\\.\\d{2})");
        Matcher matcher = anyDecimalPattern.matcher(text);
        BigDecimal maxAmount = BigDecimal.ZERO;
        while (matcher.find()) {
            BigDecimal foundAmount = new BigDecimal(matcher.group(1));
            if (foundAmount.compareTo(maxAmount) > 0) maxAmount = foundAmount;
        }
        return maxAmount;
    }

    private String extractMerchant(String text) {
        if (text == null || text.isEmpty()) return "Agriculture Store";
        String[] lines = text.split("\\n");
        return (lines.length > 0 && lines[0].length() > 2) ? lines[0].trim() : "Krishi Kendra";
    }

    private String extractCategory(String text) {
        String lower = text.toLowerCase();
        if (lower.contains("seed")) return "Seeds";
        if (lower.contains("urea") || lower.contains("fertilizer")) return "Fertilizer";
        if (lower.contains("labor") || lower.contains("worker")) return "Labor";
        return "General Farming";
    }

    private String extractCropType(String text) {
        String lower = text.toLowerCase();
        if (lower.contains("wheat")) return "Wheat";
        if (lower.contains("rice") || lower.contains("paddy")) return "Rice";
        return "Mixed Crop";
    }

    private String extractSeason(String text) {
        String lower = text.toLowerCase();
        if (lower.contains("kharif")) return "Kharif";
        if (lower.contains("rabi")) return "Rabi";
        
        int month = LocalDate.now().getMonthValue();
        return (month >= 6 && month <= 10) ? "Kharif" : (month >= 11 || month <= 3) ? "Rabi" : "Zaid";
    }
}