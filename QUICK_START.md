# Quick Start Guide - Launch the Expense Tracker

Follow these steps to launch your Expense Tracker application.

## Prerequisites Check

Before starting, make sure you have:
- ✅ Java 17+ installed
- ✅ Maven installed
- ✅ Node.js 16+ and npm installed
- ✅ Backend and frontend code in place

## Step-by-Step Launch Instructions

### Step 1: Start the Backend (Spring Boot)

1. **Open a terminal/PowerShell window**

2. **Navigate to the backend directory:**
   ```powershell
   cd "D:\Expense Tracker with OCR\backend"
   ```

3. **Build the project (first time only):**
   ```powershell
   mvn clean install
   ```
   This downloads dependencies and compiles the code. It may take a few minutes the first time.

4. **Start the Spring Boot application:**
   ```powershell
   mvn spring-boot:run
   ```

5. **Wait for the backend to start:**
   - You should see: "Started ExpenseTrackerApplication"
   - Backend will be running on: `http://localhost:8080`
   - Keep this terminal window open!

### Step 2: Start the Frontend (React)

1. **Open a NEW terminal/PowerShell window** (keep the backend running)

2. **Navigate to the frontend directory:**
   ```powershell
   cd "D:\Expense Tracker with OCR\frontend"
   ```

3. **Install dependencies (first time only):**
   ```powershell
   npm install
   ```
   This downloads React and other dependencies. It may take a few minutes the first time.

4. **Start the React development server:**
   ```powershell
   npm start
   ```

5. **Wait for the frontend to start:**
   - Your browser should automatically open to: `http://localhost:3000`
   - If not, manually open: `http://localhost:3000`
   - Keep this terminal window open!

### Step 3: Use the Application

1. **The application should now be running!**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080`

2. **Test the application:**
   - Click "Add Expense" to add a manual expense
   - Click "Upload Receipt" to test OCR functionality
   - View expenses in the "Expenses" tab
   - Check summary in the "Summary" tab

## Quick Launch Commands (Copy & Paste)

### Terminal 1 - Backend:
```powershell
cd "D:\Expense Tracker with OCR\backend"
mvn spring-boot:run
```

### Terminal 2 - Frontend:
```powershell
cd "D:\Expense Tracker with OCR\frontend"
npm start
```

## Troubleshooting

### Backend won't start?

**Error: "mvn is not recognized"**
- Install Maven or add it to your PATH
- Or use: `./mvnw spring-boot:run` (if maven wrapper exists)

**Error: "Java version"**
- Make sure Java 17+ is installed
- Check with: `java -version`

**Port 8080 already in use:**
- Stop other applications using port 8080
- Or change port in `application.properties`: `server.port=8081`

### Frontend won't start?

**Error: "npm is not recognized"**
- Install Node.js from nodejs.org
- Restart your terminal after installation

**Error: "port 3000 already in use"**
- Stop other React apps
- Or press `Y` when prompted to use a different port

**Error: "Cannot find module"**
- Run `npm install` again in the frontend directory

### Application loads but shows errors?

**"Failed to fetch" or CORS errors:**
- Make sure backend is running on port 8080
- Check backend console for errors
- Verify `http://localhost:8080/api/expenses` works in browser

**Database errors:**
- H2 database starts automatically with Spring Boot
- Check backend logs for database initialization messages

## Stopping the Application

1. **Stop Frontend:**
   - In the frontend terminal, press `Ctrl+C`
   - Press `Y` if asked to terminate

2. **Stop Backend:**
   - In the backend terminal, press `Ctrl+C`
   - Wait for graceful shutdown

## Verifying Everything Works

### Test Backend:
Open in browser: `http://localhost:8080/api/expenses`
- Should show: `[]` (empty array) or a list of expenses

### Test H2 Console:
Open in browser: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:expensedb`
- Username: `sa`
- Password: (empty)
- Click Connect

### Test Frontend:
Open in browser: `http://localhost:3000`
- Should see the Expense Tracker interface
- All tabs should be clickable

## Next Steps After Launch

1. ✅ Add your first expense manually
2. ✅ Try uploading a receipt (if Tesseract is installed)
3. ✅ View expenses in the list
4. ✅ Check the summary tab
5. ✅ Explore the H2 database console

## Quick Reference

| Service | URL | Status Check |
|---------|-----|--------------|
| Frontend | http://localhost:3000 | Browser opens automatically |
| Backend API | http://localhost:8080/api/expenses | Should return JSON |
| H2 Console | http://localhost:8080/h2-console | Database management |

---

**That's it! Your Expense Tracker is now running! 🎉**

