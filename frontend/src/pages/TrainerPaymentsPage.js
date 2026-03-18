export function TrainerPaymentsPage() {
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Payment <span class="text-gradient">History</span></h1>
        <p class="text-muted">Track your earnings and payment history</p>
      </div>
      
      <!-- Earnings Stats -->
      <div class="flex gap-4 mb-6" style="flex-wrap: wrap;">
        <div class="glass-card" style="padding: 1.5rem; min-width: 180px;">
          <p class="text-muted text-sm">Total Earnings</p>
          <h3 class="text-2xl font-heading text-primary">₹2,45,000</h3>
        </div>
        <div class="glass-card" style="padding: 1.5rem; min-width: 180px;">
          <p class="text-muted text-sm">This Month</p>
          <h3 class="text-2xl font-heading">₹45,000</h3>
        </div>
        <div class="glass-card" style="padding: 1.5rem; min-width: 180px;">
          <p class="text-muted text-sm">Pending</p>
          <h3 class="text-2xl font-heading text-warning">₹12,500</h3>
        </div>
        <div class="glass-card" style="padding: 1.5rem; min-width: 180px;">
          <p class="text-muted text-sm">Sessions Completed</p>
          <h3 class="text-2xl font-heading">156</h3>
        </div>
      </div>
      
      <!-- Recent Transactions -->
      <div class="glass-card">
        <h3 class="text-xl font-heading mb-4">Recent Transactions</h3>
        <div class="flex flex-column">
          ${transactionsHtml()}
        </div>
      </div>
    </div>
  `;
}

function transactionsHtml() {
  const transactions = [
    { id: 't1', student: 'Emma Davis', amount: 2500, date: 'Today', status: 'Completed', method: 'UPI' },
    { id: 't2', student: 'Mike Johnson', amount: 2500, date: 'Yesterday', status: 'Completed', method: 'UPI' },
    { id: 't3', student: 'Sarah Williams', amount: 1500, date: 'Feb 12', status: 'Completed', method: 'Card' },
    { id: 't4', student: 'David Chen', amount: 3000, date: 'Feb 10', status: 'Pending', method: 'UPI' },
    { id: 't5', student: 'James Wilson', amount: 2000, date: 'Feb 8', status: 'Completed', method: 'Cash' },
  ];
  
  return transactions.map(t => `
    <div class="flex align-center justify-between" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
      <div class="flex align-center gap-4">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${t.status === 'Completed' ? 'var(--primary-glow)' : 'var(--warning)'}; display: flex; align-items: center; justify-content: center;">
          <i class="ph-bold ${t.status === 'Completed' ? 'ph-check' : 'ph-clock'} ${t.status === 'Completed' ? 'text-primary' : 'text-warning'}"></i>
        </div>
        <div>
          <h5 class="font-medium">${t.student}</h5>
          <p class="text-sm text-muted">${t.date} • ${t.method}</p>
        </div>
      </div>
      <div class="flex align-center gap-4">
        <span class="font-heading text-lg ${t.status === 'Completed' ? 'text-primary' : 'text-warning'}">₹${t.amount}</span>
        <span class="badge" style="background: ${t.status === 'Completed' ? 'var(--primary-glow)' : 'rgba(245, 158, 11, 0.1)'}; color: ${t.status === 'Completed' ? 'var(--primary)' : 'var(--warning)'};">${t.status}</span>
      </div>
    </div>
  `).join('');
}
