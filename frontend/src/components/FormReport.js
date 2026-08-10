import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function FarmReport({ expenses, total }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(21, 128, 61); // Green
    doc.text("Krishi-Dhan: Farm Expense Report", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 28);

    // Summary Box
    doc.setDrawColor(200);
    doc.line(14, 32, 196, 32);
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Farm Investment: RS ${total.toLocaleString()}`, 14, 42);
    doc.text(`Total Records: ${expenses.length}`, 14, 50);

    // Table
    const tableColumn = ["Date", "Description", "Crop", "Category", "Amount (RS)"];
    const tableRows = expenses.map(exp => [
      new Date(exp.expenseDate).toLocaleDateString(),
      exp.description,
      exp.cropType || 'N/A',
      exp.category,
      exp.amount
    ]);

    doc.autoTable({
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillStyle: [21, 128, 61] }
    });

    doc.save(`Farm_Report_${new Date().getMonth() + 1}.pdf`);
  };

  return (
    <div className="report-section" style={styles.container}>
      <div style={styles.textSide}>
        <h3>📜 Official Farm Records</h3>
        <p>Need a statement for a Bank Loan or Government Subsidy? Download your full history as a professional PDF.</p>
      </div>
      <button onClick={downloadPDF} style={styles.btn}>
        📥 Download PDF Report
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0fdf4',
    padding: '25px',
    borderRadius: '16px',
    border: '1px solid #bbf7d0',
    marginTop: '30px'
  },
  textSide: { flex: 1 },
  btn: {
    backgroundColor: '#15803d',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
};

export default FarmReport;