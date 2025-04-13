import { addExpense, renderExpenses } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  renderExpenses();
  document.getElementById('expense-form').addEventListener('submit', addExpense);
  document.getElementById('filter').addEventListener('change', renderExpenses);
});
