# Database Connection Guide

This guide explains how to connect your Expense Tracker application to different databases.

## Current Setup (Default)

The application is **already connected** to an H2 in-memory database. It works automatically when you start the Spring Boot application.

**Note**: With the current H2 in-memory setup, data is lost when you restart the application.

---

## Option 1: H2 File-Based Database (Recommended for Development)

This keeps your data in a file, so it persists between restarts.

### Steps:

1. **Update `application.properties`** or run with profile:
   - The file `application-h2-file.properties` is already created
   - Or update `application.properties` to change:
     ```properties
     spring.datasource.url=jdbc:h2:file:./data/expensedb
     ```

2. **Start the application**:
   ```bash
   mvn spring-boot:run
   ```
   Or with profile:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=h2-file
   ```

3. **Database file location**: 
   - The database will be created in `backend/data/expensedb.mv.db`
   - Data persists between restarts

4. **Access H2 Console**:
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:file:./data/expensedb`
   - Username: `sa`
   - Password: (empty)

---

## Option 2: MySQL Database (Production)

### Prerequisites:
- MySQL Server installed and running
- MySQL Workbench or command-line access

### Steps:

1. **Create MySQL Database**:
   ```sql
   CREATE DATABASE expensedb;
   ```

2. **Update `application-mysql.properties`**:
   - Change `spring.datasource.username=root`
   - Change `spring.datasource.password=your_password_here` to your MySQL password

3. **Start application with MySQL profile**:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```
   
   Or update `application.properties` directly with MySQL settings.

4. **Verify Connection**:
   - Check application logs for "HikariPool-1 - Starting..."
   - If you see connection errors, verify MySQL is running and credentials are correct

---

## Option 3: PostgreSQL Database (Production)

### Prerequisites:
- PostgreSQL installed and running

### Steps:

1. **Create PostgreSQL Database**:
   ```sql
   CREATE DATABASE expensedb;
   ```

2. **Update `application-postgresql.properties`**:
   - Change `spring.datasource.username=postgres`
   - Change `spring.datasource.password=your_password_here` to your PostgreSQL password

3. **Start application with PostgreSQL profile**:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=postgresql
   ```

---

## Quick Start (Using Current H2 In-Memory)

**The database is already connected!** Just start the application:

```bash
cd backend
mvn spring-boot:run
```

The application will:
- ✅ Automatically create the database schema
- ✅ Create the `expenses` table
- ✅ Be ready to use immediately

### Access H2 Console:
1. Start the application
2. Open browser: `http://localhost:8080/h2-console`
3. Use these settings:
   - **JDBC URL**: `jdbc:h2:mem:expensedb`
   - **Username**: `sa`
   - **Password**: (leave empty)
   - Click **Connect**

---

## Switching Between Databases

### Method 1: Using Profiles (Recommended)

Create/update `application.properties`:
```properties
spring.profiles.active=h2-file
```

Available profiles:
- `h2-file` - H2 file-based (persistent)
- `mysql` - MySQL database
- `postgresql` - PostgreSQL database

### Method 2: Direct Configuration

Edit `application.properties` directly with your database settings.

---

## Troubleshooting

### Connection Refused
- **MySQL/PostgreSQL**: Ensure the database server is running
- Check if the port (3306 for MySQL, 5432 for PostgreSQL) is correct

### Authentication Failed
- Verify username and password in `application.properties`
- For MySQL: Check if user has proper permissions

### Table Not Found
- Set `spring.jpa.hibernate.ddl-auto=update` (already set)
- This automatically creates tables on startup

### H2 Console Not Accessible
- Ensure `spring.h2.console.enabled=true` in properties
- Access at: `http://localhost:8080/h2-console`

---

## Database Schema

The application automatically creates this table:

```sql
CREATE TABLE expenses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(255),
    expense_date TIMESTAMP,
    created_at TIMESTAMP,
    receipt_path VARCHAR(255),
    merchant_name VARCHAR(255)
);
```

---

## Summary

- ✅ **Current Setup**: H2 in-memory (works immediately, data lost on restart)
- ✅ **For Development**: Use H2 file-based (data persists)
- ✅ **For Production**: Use MySQL or PostgreSQL

The database connection is **already configured and working**! You just need to start the Spring Boot application.

