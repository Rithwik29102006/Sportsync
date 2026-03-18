export function ReportBlockPage() {
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Report & <span class="text-gradient">Block</span></h1>
        <p class="text-muted">Report inappropriate users or block contacts</p>
      </div>
      
      <!-- Report Form -->
      <div class="glass-card mb-6">
        <h3 class="text-xl font-heading mb-4">Report a User</h3>
        <form id="report-form" class="flex flex-column gap-4">
          <div>
            <label class="text-sm text-muted mb-2" style="display: block;">Select User to Report</label>
            <select id="report-user" class="input-field" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: var(--bg-card-hover); border: 1px solid var(--glass-border); color: var(--text-main);">
              <option value="">Choose a user...</option>
              ${usersOptionsHtml()}
            </select>
          </div>
          <div>
            <label class="text-sm text-muted mb-2" style="display: block;">Reason for Report</label>
            <select id="report-reason" class="input-field" style="width: 100%; padding: 0.75rem; border-radius: 8px; background: var(--bg-card-hover); border: 1px solid var(--glass-border); color: var(--text-main);">
              <option value="harassment">Harassment</option>
              <option value="spam">Spam</option>
              <option value="inappropriate">Inappropriate Behavior</option>
              <option value="fake">Fake Profile</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-muted mb-2" style="display: block;">Additional Details</label>
            <textarea id="report-details" class="input-field" rows="3" placeholder="Describe the issue..." style="width: 100%; padding: 0.75rem; border-radius: 8px; background: var(--bg-card-hover); border: 1px solid var(--glass-border); color: var(--text-main); resize: vertical;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self: flex-start;">
            <i class="ph-bold ph-flag"></i> Submit Report
          </button>
        </form>
      </div>
      
      <!-- Blocked Users -->
      <div class="glass-card mb-6">
        <h3 class="text-xl font-heading mb-4">Blocked Users</h3>
        <div id="blocked-users-list" class="flex flex-column gap-3">
          ${blockedUsersHtml()}
        </div>
      </div>
      
      <!-- My Reports History -->
      <div class="glass-card">
        <h3 class="text-xl font-heading mb-4">My Reports History</h3>
        <div id="reports-history" class="flex flex-column gap-3">
          ${reportsHistoryHtml()}
        </div>
      </div>
    </div>
  `;
}

function usersOptionsHtml() {
  const users = [
    { id: 'u1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john' },
    { id: 'u2', name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { id: 'u3', name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { id: 'u4', name: 'Carol Brown', avatar: 'https://i.pravatar.cc/150?u=carol' },
  ];
  return users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
}

function blockedUsersHtml() {
  const blocked = [
    { id: 'b1', name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=mike', reason: 'Harassment', blockedOn: 'Feb 10, 2026' },
    { id: 'b2', name: 'Rachel Green', avatar: 'https://i.pravatar.cc/150?u=rachel', reason: 'Spam', blockedOn: 'Jan 28, 2026' },
  ];
  
  if (blocked.length === 0) {
    return '<p class="text-muted">No blocked users</p>';
  }
  
  return blocked.map(u => `
    <div class="flex align-center justify-between" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 8px;">
      <div class="flex align-center gap-3">
        <img src="${u.avatar}" alt="${u.name}" style="width: 40px; height: 40px; border-radius: 50%;">
        <div>
          <h5 class="font-medium">${u.name}</h5>
          <p class="text-xs text-muted">Blocked: ${u.blockedOn}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm" onclick="window.notify('Unblocked ${u.name}', 'success')">
          <i class="ph-bold ph-user-plus"></i> Unblock
        </button>
      </div>
    </div>
  `).join('');
}

function reportsHistoryHtml() {
  const reports = [
    { id: 'r1', user: 'Alex Turner', reason: 'Harassment', status: 'Pending', date: 'Feb 14, 2026' },
    { id: 'r2', user: 'Sam Wilson', reason: 'Fake Profile', status: 'Resolved', date: 'Feb 1, 2026' },
  ];
  
  if (reports.length === 0) {
    return '<p class="text-muted">No reports submitted</p>';
  }
  
  return reports.map(r => `
    <div class="flex align-center justify-between" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 8px;">
      <div>
        <h5 class="font-medium">${r.user}</h5>
        <p class="text-sm text-muted">Reason: ${r.reason}</p>
        <p class="text-xs text-muted">Submitted: ${r.date}</p>
      </div>
      <span class="badge" style="background: ${r.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)'}; color: ${r.status === 'Pending' ? 'var(--warning)' : 'var(--success)'};">${r.status}</span>
    </div>
  `).join('');
}

// Initialize report form handling
setTimeout(() => {
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userId = document.getElementById('report-user').value;
      const reason = document.getElementById('report-reason').value;
      const details = document.getElementById('report-details').value;
      
      if (!userId) {
        window.notify('Please select a user to report', 'error');
        return;
      }
      
      // Submit report
      window.notify('Report submitted successfully. Admin will review it.', 'success');
      reportForm.reset();
    });
  }
}, 100);
