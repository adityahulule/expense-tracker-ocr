# Troubleshooting Guide

## Receipt Upload - Internal Server Error

If you're getting an "Internal Server Error" when uploading receipts, here are the most common causes and solutions:

### Issue 1: Tesseract OCR Not Installed

**Symptoms:**
- Internal Server Error when uploading receipt
- Error message about Tesseract or OCR

**Solution:**
The application has been updated to work **even without Tesseract OCR installed**. The receipt will be saved, but OCR processing won't work.

**To enable OCR (optional):**

1. **Install Tesseract OCR:**
   - **Windows**: Download from https://github.com/UB-Mannheim/tesseract/wiki
   - **macOS**: `brew install tesseract`
   - **Linux**: `sudo apt-get install tesseract-ocr`

2. **Configure Tesseract Path (if needed):**
   - The application will auto-detect Tesseract on Windows
   - If it doesn't work, update `backend/src/main/resources/application.properties`:
     ```properties
     tess4j.datapath=C:/Program Files/Tesseract-OCR/tessdata
     ```

3. **Restart the backend application**

### Issue 2: File Upload Directory Permissions

**Symptoms:**
- Error saving file
- Permission denied errors

**Solution:**
- Ensure the application has write permissions in the project directory
- The `uploads/receipts/` directory will be created automatically
- On Windows, run the application as Administrator if needed

### Issue 3: Invalid File Type

**Symptoms:**
- Error: "Invalid file type"

**Solution:**
- Only image files are supported (JPG, PNG, GIF, etc.)
- Ensure you're uploading an actual image file

### Issue 4: File Too Large

**Symptoms:**
- Error about file size

**Solution:**
- Maximum file size is 10MB (configured in `application.properties`)
- Compress or resize the image if it's too large

## How the Updated System Works

The application now has **graceful degradation**:

1. **If Tesseract is installed**: Full OCR processing works
2. **If Tesseract is NOT installed**: 
   - Receipt file is still saved
   - Expense is created with default values
   - You can manually update the expense details

### What Happens When OCR Fails:

- ✅ Receipt image is saved
- ✅ Expense entry is created
- ⚠️ Amount defaults to $0.00 (you can edit it)
- ⚠️ Description says "Expense from receipt - Please update details"
- ✅ You can edit the expense to add correct details

## Checking Backend Logs

To see detailed error messages:

1. Check the console/terminal where you're running the backend
2. Look for error messages starting with "Warning:" or "Error:"
3. The logs will tell you if Tesseract is available or not

## Testing Without OCR

You can test the application without installing Tesseract:

1. Upload a receipt image
2. The system will save it and create an expense entry
3. Edit the expense to add the correct amount and description
4. The receipt file is still saved for reference

## Next Steps

1. **Restart your backend** to apply the fixes
2. **Try uploading a receipt again**
3. If you see a warning about OCR, that's normal - the receipt is still saved
4. Edit the expense entry to add the correct details

The application should now work even without Tesseract OCR installed!

