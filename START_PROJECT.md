# 🚀 How to Start the Expense Tracker Project

## Quick Start (2 Steps)

### Step 1: Start Backend (Terminal 1)

```powershell
cd "D:\Expense Tracker with OCR\backend"
mvn spring-boot:run
```

**Wait for:** `Started ExpenseTrackerApplication`
- ✅ Backend running on: `http://localhost:8080`
- ⚠️ Keep this terminal open!

---

### Step 2: Start Frontend (Terminal 2 - NEW WINDOW)

```powershell
cd "D:\Expense Tracker with OCR\frontend"
npm install    # Only needed first time
npm start
```

**Wait for:** Browser opens automatically
- ✅ Frontend running on: `http://localhost:3000`
- ⚠️ Keep this terminal open!

---

## ✅ That's It!

Your application is now running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

---

## 📋 Detailed Steps

### Prerequisites Check

Make sure you have:
- ✅ Java 17+ installed (`java -version`)
- ✅ Maven installed (`mvn -version`)
- ✅ Node.js 16+ installed (`node -version`)
- ✅ npm installed (`npm -version`)

### First Time Setup

#### Backend (First Time):
```powershell
cd "D:\Expense Tracker with OCR\backend"
mvn clean install    # Downloads dependencies (takes a few minutes)
mvn spring-boot:run  # Starts the server
```

#### Frontend (First Time):
```powershell
cd "D:\Expense Tracker with OCR\frontend"
npm install          # Downloads dependencies (takes a few minutes)
npm start            # Starts the React app
```

### Subsequent Starts

Just run:
- **Backend**: `mvn spring-boot:run`
- **Frontend**: `npm start`

---

## 🎯 Verify It's Working

### 1. Check Backend:
Open browser: `http://localhost:8080/api/expenses`
- Should show: `[]` (empty) or list of expenses

### 2. Check Frontend:
Open browser: `http://localhost:3000`
- Should show: Expense Tracker interface

### 3. Test Features:
- ✅ Add an expense
- ✅ Upload a receipt
- ✅ View expenses
- ✅ Try filtering/searching
- ✅ Check charts in Summary tab
- ✅ Export data

---

## 🛑 Stopping the Application

### Stop Frontend:
- In frontend terminal: Press `Ctrl+C`
- Press `Y` if asked

### Stop Backend:
- In backend terminal: Press `Ctrl+C`
- Wait for shutdown message

---

## ⚠️ Troubleshooting

### Backend Issues:

**"mvn is not recognized"**
- Install Maven or use: `./mvnw spring-boot:run`

**"Port 8080 already in use"**
- Stop other apps on port 8080
- Or change port in `application.properties`

**"Java version error"**
- Install Java 17+
- Check: `java -version`

### Frontend Issues:

**"npm is not recognized"**
- Install Node.js from nodejs.org
- Restart terminal after installation

**"Port 3000 already in use"**
- Press `Y` to use different port
- Or stop other React apps

**"Cannot find module"**
- Run `npm install` again

**"Failed to fetch" errors**
- Make sure backend is running
- Check backend console for errors

---

## 📝 Quick Reference

| Service | URL | Command |
|---------|-----|---------|
| Frontend | http://localhost:3000 | `npm start` |
| Backend | http://localhost:8080 | `mvn spring-boot:run` |
| H2 Console | http://localhost:8080/h2-console | (Browser) |

---

## 🎉 You're Ready!

Once both are running:
1. Open http://localhost:3000
2. Start tracking your expenses!
3. Try all the new features we added!

---

**Need Help?** Check `QUICK_START.md` or `TROUBLESHOOTING.md` for more details.

