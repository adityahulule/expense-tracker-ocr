import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './ExpenseCharts.css';

const ExpenseCharts = ({ expenses }) => {
  // Process data to group by month
  const chartData = useMemo(() => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize months with 0
    const monthlyTotals = monthNames.map(month => ({ name: month, total: 0 }));

    expenses.forEach(expense => {
      const date = new Date(expense.expenseDate || expense.createdAt);
      const monthIndex = date.getMonth();
      monthlyTotals[monthIndex].total += Number(expense.amount);
    });

    // Filter to show only months that have data or the current year
    return monthlyTotals;
  }, [expenses]);

  const COLORS = ['#2d5a27', '#4caf50', '#81c784', '#a5d6a7'];

  return (
    <div className="charts-wrapper">
      <h3>Monthly Investment Overview</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
            <Tooltip 
              cursor={{fill: '#f5f5f5'}}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="total" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.total > 2000 ? '#2d5a27' : '#81c784'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseCharts;