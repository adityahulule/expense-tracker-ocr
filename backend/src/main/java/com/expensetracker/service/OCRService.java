package com.expensetracker.service;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;

@Service
public class OCRService {

    @Value("${tess4j.datapath}")
    private String tessDataPath;

    // This name MUST match exactly what you call in ExpenseService
        public String extractTextFromImage(MultipartFile file) throws Exception {
        ITesseract instance = new Tesseract();
        
        // Ensure the path ends with a slash if needed by the library version
        instance.setDatapath(tessDataPath); 
        instance.setLanguage("eng"); // Explicitly tell it to use eng.traineddata

        // Create a unique temp file to avoid permission conflicts in the temp directory
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File convFile = File.createTempFile("receipt_", file.getOriginalFilename(), tempDir);
        
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }

        try {
            // Log this to your console so you can see if OCR actually starts
            System.out.println("Starting OCR on file: " + convFile.getAbsolutePath());
            String result = instance.doOCR(convFile);
            return result;
        } catch (Exception e) {
            // This will print the EXACT error (like "Native library not found") in your terminal
            e.printStackTrace(); 
            throw new Exception("OCR Engine failed: " + e.getMessage());
        } finally {
            if (convFile.exists()) {
                convFile.delete();
            }
        }
    }
}