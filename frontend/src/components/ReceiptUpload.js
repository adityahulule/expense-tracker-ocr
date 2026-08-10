import React, { useState } from 'react';
import './ReceiptUpload.css';
import { uploadReceipt } from '../services/expenseService';

function ReceiptUpload({ onExpenseAdded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      setFile(selectedFile);
      setError('');
      setSuccess('');
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Get user data correctly
      const userDataString = localStorage.getItem('user');
      if (!userDataString) {
        setError("Please log in first");
        return;
      }
      const userData = JSON.parse(userDataString);

      // 2. Call the service with BOTH file and userId
      // Note: We use 'file' from your state, and 'userData.id'
      const response = await uploadReceipt(file, userData.id);

      // 3. Handle Success
      setSuccess('Receipt processed successfully!');
      setFile(null);
      setPreview(null);
      
      if (onExpenseAdded) onExpenseAdded(); // Refresh the list
      
      // Reset the HTML form input
      e.target.reset();

    } catch (error) {
      console.error('Error uploading receipt:', error);
      let errorMessage = 'Failed to process receipt. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="receipt-upload-container">
      <h2>Upload Receipt</h2>
      <p className="upload-description">
        Upload a receipt image and we'll automatically extract expense information using OCR.
      </p>

      <form onSubmit={handleSubmit} className="upload-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="file-input-wrapper">
          <input
            type="file"
            id="receipt-file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="receipt-file" className="file-label">
            {file ? file.name : 'Choose Receipt Image'}
          </label>
        </div>

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Receipt preview" className="preview-image" />
          </div>
        )}

        <button
          type="submit"
          className="btn-upload"
          disabled={loading || !file}
        >
          {loading ? 'Processing...' : 'Upload & Process Receipt'}
        </button>
      </form>

      <div className="upload-tips">
        <h3>Tips for best results:</h3>
        <ul>
          <li>Use clear, well-lit images</li>
          <li>Ensure text is readable and not blurry</li>
          <li>Include the full receipt in the image</li>
          <li>Supported formats: JPG, PNG, GIF</li>
        </ul>
      </div>
    </div>
  );
}

export default ReceiptUpload;

