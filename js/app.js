import { formatRupiah, formatDate } from './modules/utils.js';

const STORAGE_KEY = 'expenses_mahasiswa';

export function addExpense(e) {
  e.preventDefault();
  const desc = document.getElementById('description').value.trim();
  const amount = parseInt(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!desc || isNaN(amount) || amount <= 0) return;

  const expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const expense = {
    id: Date.now(),
    desc,
    amount,
    category,
    date: new Date().toISOString()
  };

  expenses.push(expense);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));

  e.target.reset();
  renderExpenses();
}

export function renderExpenses() {
  const list = document.getElementById('expenses-list');
  const total = document.getElementById('total');
  const filter = document.getElementById('filter').value;
  const expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const filtered = filter === 'all' ? expenses : expenses.filter(exp => exp.category === filter);

  let html = '';
  let totalAmount = 0;
  const categoryTotals = {};

  filtered.forEach(exp => {
    html += `
    <div class="p-3 border border-gray-200 rounded-md bg-gray-50 flex justify-between items-center">
      <div>
        <div class="font-semibold">${exp.desc}</div>
        <div class="text-sm text-gray-600">${exp.category} • ${formatRupiah(exp.amount)} • ${formatDate(exp.date)}</div>
      </div>
      <button data-id="${exp.id}" class="text-red-500 hover:text-red-700 text-sm delete-btn">Hapus</button>
    </div>`;
    totalAmount += exp.amount;
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  list.innerHTML = html || '<p class="text-gray-500 text-sm">Belum ada pengeluaran</p>';
  total.textContent = formatRupiah(totalAmount);

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteExpense(btn.getAttribute('data-id'));
    });
  });

  renderChart(categoryTotals);
}

function deleteExpense(id) {
  let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  expenses = expenses.filter(e => e.id != id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  renderExpenses();
}

// Grafik
let chartInstance = null;

function renderChart(data) {
  const ctx = document.getElementById('expenseChart');
  if (!ctx) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Pengeluaran per Kategori',
        data: Object.values(data),
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}
