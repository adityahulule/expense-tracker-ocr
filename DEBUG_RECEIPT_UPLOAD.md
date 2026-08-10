# Debugging Receipt Upload Errors

If you're getting "Failed to process receipt. Please try again.", follow these steps:

## Step 1: Check Backend Logs

**Most Important:** Look at the terminal/console where your backend is running. You should see detailed error messages there.

Common error messages you might see:

### Error: "Failed to save uploaded file"
- **Cause**: Permission issue or disk space
- **Solution**: 
  - Check if the `backend/uploads/receipts/` directory exists and is writable
  - Ensure you have write permissions in the backend folder
  - On Windows, try running the backend as Administrator

### Error: "TesseractException" or "OCR processing failed"
- **Cause**: Tesseract OCR is not properly configured
- **Solution**: 
  - This is OK! The receipt will still be saved, but OCR won't work
  - You can manually edit the expense after upload
  - Or install/configure Tesseract (see TESSERACT_SETUP.md)

### Error: "NullPointerException" or similar
- **Cause**: Database or service initialization issue
- **Solution**: 
  - Make sure the backend started successfully
  - Check if the database is running (H2 should start automatically)
  - Restart the backend

## Step 2: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the "Console" tab
3. Try uploading a receipt again
4. Look for any error messages in red
5. Check the "Network" tab to see the actual error response from the server

## Step 3: Verify File Upload

Make sure:
- ✅ You're uploading an actual image file (JPG, PNG, GIF)
- ✅ File size is under 10MB
- ✅ File is not corrupted

## Step 4: Check Backend Status

Verify the backend is running:
1. Open: `http://localhost:8080/api/expenses`
2. You should see `[]` (empty array) or a list of expenses
3. If you get an error, the backend isn't running properly

## Step 5: Common Fixes

### Fix 1: Restart Backend
```powershell
# Stop backend (Ctrl+C)
cd backend
mvn spring-boot:run
```

### Fix 2: Create Uploads Directory Manually
```powershell
cd backend
mkdir uploads
mkdir uploads\receipts
```

### Fix 3: Check File Permissions
- Right-click on the `backend` folder
- Properties → Security
- Ensure your user has "Write" permissions

### Fix 4: Check Database Connection
- The backend should show "HikariPool-1 - Starting..." in logs
- If you see database errors, check `application.properties`

## Step 6: Get Detailed Error Information

The updated code now provides more detailed error messages. Check:

1. **Frontend**: The error message should now show more details
2. **Backend Console**: Full stack trace is printed
3. **Browser Network Tab**: Check the response body for error details

## Step 7: Test with a Simple Image

Try uploading a very simple, small image file first:
- Small JPG file (< 1MB)
- Clear, well-lit image
- Standard format (not HEIC or other exotic formats)

## Still Not Working?

1. **Copy the exact error message** from:
   - Backend console
   - Browser console (F12)
   - Frontend error message

2. **Check these files exist:**
   - `backend/uploads/receipts/` (will be created automatically)
   - Backend is running on port 8080
   - Frontend is running on port 3000

3. **Try these commands:**
   ```powershell
   # Check if backend is accessible
   curl http://localhost:8080/api/expenses
   
   # Or in browser, visit:
   http://localhost:8080/api/expenses
   ```

## Quick Test

To test if the upload endpoint works at all:

1. Make sure backend is running
2. Open browser console (F12)
3. Try uploading a small image
4. Check the Network tab for the `/api/expenses/upload-receipt` request
5. Look at the response - it will have detailed error information

The error message should now tell you exactly what went wrong!

