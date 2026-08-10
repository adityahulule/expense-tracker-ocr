package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    
    List<Expense> findByUserId(Long userId);
    
    List<Expense> findByCategory(String category);
    
    List<Expense> findByExpenseDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT e FROM Expense e ORDER BY e.expenseDate DESC")
    List<Expense> findAllOrderByDateDesc();
    
    @Query("SELECT SUM(e.amount) FROM Expense e")
    BigDecimal getTotalExpenses();
}

