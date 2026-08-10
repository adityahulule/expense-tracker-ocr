# How to View Transactions in the Database

There are several ways to view your expense transactions in the database:

## Method 1: H2 Database Console (Recommended)

The H2 database has a built-in web console that you can access directly from your browser.

### Steps:

1. **Make sure your backend is running**
   ```powershell
   cd backend
   mvn spring-boot:run
   ```

2. **Open your browser** and go to:
   ```
   http://localhost:8080/h2-console
   ```

3. **Enter connection details:**
   - **JDBC URL**: `jdbc:h2:mem:expensedb`
   - **Username**: `sa`
   - **Password**: (leave empty)
   - Click **Connect**

4. **View all expenses:**
   ```sql
   SELECT * FROM expenses;
   ```

5. **View expenses with details:**
   ```sql
   SELECT 
       id,
       description,
       amount,
       category,
       merchant_name,
       expense_date,
       created_at,
       receipt_path
   FROM expenses
   ORDER BY expense_date DESC;
   ```

6. **Get total expenses:**
   ```sql
   SELECT SUM(amount) AS total_expenses FROM expenses;
   ```

7. **View expenses by category:**
   ```sql
   SELECT category, SUM(amount) AS total
   FROM expenses
   WHERE category IS NOT NULL
   GROUP BY category
   ORDER BY total DESC;
   ```

---

## Method 2: View Through the Frontend

The easiest way is to use the application itself:

1. **Open the application**: `http://localhost:3000`
2. **Click on "Expenses" tab** - You'll see all your expenses
3. **Click on "Summary" tab** - See totals and category breakdown

---

## Method 3: Using API Endpoints

You can directly query the API:

### View all expenses:
```
http://localhost:8080/api/expenses
```

### Get total expenses:
```
http://localhost:8080/api/expenses/total
```

### View expenses by category:
```
http://localhost:8080/api/expenses/category/Food
```

### View a specific expense:
```
http://localhost:8080/api/expenses/1
```

---

## Method 4: Using cURL or Postman

### Get all expenses:
```powershell
curl http://localhost:8080/api/expenses
```

### Get total:
```powershell
curl http://localhost:8080/api/expenses/total
```

---

## Useful SQL Queries for H2 Console

### View all expenses:
```sql
SELECT * FROM expenses ORDER BY expense_date DESC;
```

### Count total transactions:
```sql
SELECT COUNT(*) AS total_transactions FROM expenses;
```

### View expenses for a specific date range:
```sql
SELECT * FROM expenses 
WHERE expense_date >= '2024-01-01' 
  AND expense_date <= '2024-12-31'
ORDER BY expense_date DESC;
```

### View expenses by category:
```sql
SELECT category, COUNT(*) AS count, SUM(amount) AS total
FROM expenses
WHERE category IS NOT NULL
GROUP BY category
ORDER BY total DESC;
```

### View expenses with receipt:
```sql
SELECT id, description, amount, receipt_path
FROM expenses
WHERE receipt_path IS NOT NULL;
```

### Find largest expenses:
```sql
SELECT id, description, amount, category, expense_date
FROM expenses
ORDER BY amount DESC
LIMIT 10;
```

### Monthly summary:
```sql
SELECT 
    EXTRACT(YEAR FROM expense_date) AS year,
    EXTRACT(MONTH FROM expense_date) AS month,
    COUNT(*) AS transactions,
    SUM(amount) AS total
FROM expenses
GROUP BY EXTRACT(YEAR FROM expense_date), EXTRACT(MONTH FROM expense_date)
ORDER BY year DESC, month DESC;
```

---

## Database Schema

The `expenses` table has the following structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Primary key (auto-increment) |
| `description` | VARCHAR(255) | Expense description |
| `amount` | DECIMAL(10,2) | Expense amount |
| `category` | VARCHAR(255) | Expense category |
| `expense_date` | TIMESTAMP | When the expense occurred |
| `created_at` | TIMESTAMP | When the record was created |
| `receipt_path` | VARCHAR(255) | Path to receipt image file |
| `merchant_name` | VARCHAR(255) | Name of the merchant/store |

---

## Important Notes

### H2 In-Memory Database:
- **Current setup**: Data is stored in memory
- **Data persistence**: Data is **lost** when you restart the backend
- **To persist data**: Switch to H2 file-based or MySQL/PostgreSQL (see `DATABASE_SETUP.md`)

### To Keep Data Persistent:

1. **Switch to H2 file-based** (recommended for development):
   - Update `application.properties`:
     ```properties
     spring.datasource.url=jdbc:h2:file:./data/expensedb
     ```
   - Data will be saved in `backend/data/expensedb.mv.db`

2. **Or use MySQL/PostgreSQL** (for production):
   - See `DATABASE_SETUP.md` for instructions

---

## Quick Access

**Fastest way to view transactions:**
1. Open: `http://localhost:3000`
2. Click "Expenses" tab
3. All your transactions are displayed there!

**To see raw database data:**
1. Open: `http://localhost:8080/h2-console`
2. Connect with: `jdbc:h2:mem:expensedb` / `sa` / (no password)
3. Run: `SELECT * FROM expenses;`

---

## Troubleshooting

### H2 Console not accessible?
- Make sure backend is running
- Check `spring.h2.console.enabled=true` in `application.properties`
- Try: `http://localhost:8080/h2-console`

### No data showing?
- Check if you've added any expenses
- Verify the backend is running
- Check browser console for errors

### Data disappeared after restart?
- This is normal with H2 in-memory database
- Switch to file-based H2 or MySQL to persist data

