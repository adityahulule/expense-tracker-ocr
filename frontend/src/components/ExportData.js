import React from 'react';
import './ExportData.css';

function ExportData({ expenses }) {
  const exportToCSV = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }

    const headers = ['ID', 'Description', 'Amount', 'Category', 'Merchant', 'Date', 'Created At'];
    const rows = expenses.map(expense => [
      expense.id,
      expense.description || '',
      expense.amount || 0,
      expense.category || '',
      expense.merchantName || '',
      expense.expenseDate ? new Date(expense.expenseDate).toLocaleDateString() : '',
      expense.createdAt ? new Date(expense.createdAt).toLocaleDateString() : ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    if (expenses.length === 0) {
      alert('No expenses to export');
      return;
    }

    const jsonContent = JSON.stringify(expenses, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const printReport = () => {
    if (expenses.length === 0) {
      alert('No expenses to print');
      return;
    }

    const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Expense Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #667eea; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Expense Report</h1>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Merchant</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.map(exp => `
                <tr>
                  <td>${exp.description || 'N/A'}</td>
                  <td>${formatCurrency(exp.amount || 0)}</td>
                  <td>${exp.category || 'N/A'}</td>
                  <td>${exp.merchantName || 'N/A'}</td>
                  <td>${exp.expenseDate ? new Date(exp.expenseDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total Expenses: ${formatCurrency(total)}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="export-data">
      <h2>📥 Export Data</h2>
      <p className="export-description">
        Export your expenses in various formats for backup or analysis.
      </p>

      <div className="export-options">
        <button onClick={exportToCSV} className="export-btn csv-btn">
          📊 Export to CSV
        </button>
        <button onClick={exportToJSON} className="export-btn json-btn">
          📄 Export to JSON
        </button>
        <button onClick={printReport} className="export-btn print-btn">
          🖨️ Print Report
        </button>
      </div>

      <div className="export-info">
        <p><strong>Total Expenses:</strong> {expenses.length}</p>
        <p><strong>Total Amount:</strong> {formatCurrency(
          expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
        )}</p>
      </div>
    </div>
  );
}

export default ExportData;

