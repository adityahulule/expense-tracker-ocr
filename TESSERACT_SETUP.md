# Tesseract OCR Setup Guide

## Step 1: Verify Tesseract Installation

### On Windows:
Open PowerShell or Command Prompt and run:
```powershell
tesseract --version
```

You should see output like:
```
tesseract 5.x.x
```

If you get "command not found", Tesseract may not be in your PATH.

### On macOS/Linux:
```bash
tesseract --version
```

---

## Step 2: Find Your Tesseract Installation Path

### Windows:
Tesseract is usually installed in one of these locations:
- `C:\Program Files\Tesseract-OCR\tessdata`
- `C:\Program Files (x86)\Tesseract-OCR\tessdata`

**To find it:**
1. Open File Explorer
2. Navigate to `C:\Program Files\` or `C:\Program Files (x86)\`
3. Look for a folder named `Tesseract-OCR`
4. Inside it, you should see a `tessdata` folder
5. Copy the full path (e.g., `C:\Program Files\Tesseract-OCR\tessdata`)

### macOS:
Usually at: `/usr/local/share/tessdata` or `/opt/homebrew/share/tessdata`

### Linux:
Usually at: `/usr/share/tesseract-ocr/tessdata`

---

## Step 3: Configure the Application (If Auto-Detection Doesn't Work)

The application **automatically detects** Tesseract on Windows, but if it doesn't work:

1. **Open** `backend/src/main/resources/application.properties`

2. **Find this line:**
   ```properties
   tess4j.datapath=
   ```

3. **Update it with your Tesseract path:**
   
   **For Windows:**
   ```properties
   tess4j.datapath=C:/Program Files/Tesseract-OCR/tessdata
   ```
   Or if installed in (x86):
   ```properties
   tess4j.datapath=C:/Program Files (x86)/Tesseract-OCR/tessdata
   ```
   
   **For macOS:**
   ```properties
   tess4j.datapath=/usr/local/share/tessdata
   ```
   
   **For Linux:**
   ```properties
   tess4j.datapath=/usr/share/tesseract-ocr/tessdata
   ```

4. **Save the file**

---

## Step 4: Restart the Backend

**Important:** You must restart the backend for changes to take effect.

1. **Stop the backend** (if running):
   - Press `Ctrl+C` in the terminal where it's running

2. **Restart it:**
   ```powershell
   cd backend
   mvn spring-boot:run
   ```

3. **Check the startup logs** - Look for:
   - ✅ No "Warning: Could not initialize Tesseract" message
   - ✅ If you see the warning, Tesseract path might be wrong

---

## Step 5: Test OCR Functionality

1. **Start both servers:**
   - Backend: `http://localhost:8080`
   - Frontend: `http://localhost:3000`

2. **Upload a receipt:**
   - Go to "Upload Receipt" tab
   - Select a clear receipt image
   - Click "Upload & Process Receipt"

3. **Check the result:**
   - ✅ If OCR works: You'll see extracted amount, merchant name, and description
   - ⚠️ If OCR doesn't work: You'll see a warning, but the receipt is still saved

---

## Troubleshooting

### Issue: Still getting "OCR not available" warning

**Solution 1: Check the path**
- Verify the `tessdata` folder exists at the path you specified
- Make sure there are `.traineddata` files in the `tessdata` folder (like `eng.traineddata`)

**Solution 2: Use absolute path**
- Use forward slashes `/` even on Windows
- Don't use backslashes `\`
- Example: `C:/Program Files/Tesseract-OCR/tessdata` ✅
- Example: `C:\Program Files\Tesseract-OCR\tessdata` ❌

**Solution 3: Check backend logs**
- Look at the console output when starting the backend
- It will show the exact error if Tesseract can't be initialized

### Issue: "tessdata not found"

**Solution:**
- Make sure you're pointing to the `tessdata` folder, not the Tesseract root folder
- Correct: `C:/Program Files/Tesseract-OCR/tessdata`
- Wrong: `C:/Program Files/Tesseract-OCR`

### Issue: Tesseract command works but app doesn't detect it

**Solution:**
- The command-line Tesseract and Java Tesseract use different paths
- Manually set the path in `application.properties` as shown in Step 3

---

## Quick Test Command

You can test if Tesseract can read an image from command line:

```powershell
# Windows
tesseract "path\to\your\receipt.jpg" output.txt

# macOS/Linux
tesseract /path/to/your/receipt.jpg output.txt
```

This creates `output.txt` with the extracted text. If this works, Tesseract is installed correctly.

---

## Summary

1. ✅ Verify Tesseract is installed: `tesseract --version`
2. ✅ Find the `tessdata` folder path
3. ✅ Update `application.properties` if auto-detection doesn't work
4. ✅ Restart the backend
5. ✅ Test by uploading a receipt

The application should now automatically extract text from your receipts! 🎉

