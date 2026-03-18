export function AdminUsersPage() {
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">User <span class="text-gradient">Statistics</span></h1>
        <p class="text-muted">All users and their activity</p>
      </div>
      
      <!-- Filters -->
      <div class="glass-card mb-6" style="padding: 1.5rem;">
        <div class="flex gap-4" style="flex-wrap: wrap;">
          <div style="min-width: 200px; flex: 1;">
            <input type="text" class="input-field" placeholder="Search users..." style="width: 100%;">
          </div>
          <select class="input-field" style="width: auto; min-width: 150px;">
            <option value="all">All Types</option>
            <option value="user">Users</option>
            <option value="trainer">Trainers</option>
            <option value="admin">Admins</option>
          </select>
          <select class="input-field" style="width: auto; min-width: 150px;">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-users text-primary" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Total Users</p><h4 class="text-2xl font-bold">1,247</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-user-circle text-accent" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Active Users</p><h4 class="text-2xl font-bold">856</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-user-plus text-warning" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">New This Month</p><h4 class="text-2xl font-bold">124</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-prohibit text-danger" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Blocked Users</p><h4 class="text-2xl font-bold">12</h4></div>
        </div>
      </div>
      
      <!-- Users List -->
      <div class="glass-card">
        <h3 class="text-xl font-heading mb-4">All Users</h3>
        <div class="flex flex-column gap-3">
          ${usersListHtml()}
        </div>
      </div>
    </div>
  `;
}

function usersListHtml() {
  const users = [
    { id: 'u1', name: 'John Doe', email: 'user@sportssync.com', type: 'User', status: 'Active', bookings: 15, joined: 'Jan 2025', lastActive: 'Today' },
    { id: 'u2', name: 'Sarah Smith', email: 'trainer@sportssync.com', type: 'Trainer', status: 'Active', bookings: 45, joined: 'Mar 2024', lastActive: 'Today' },
    { id: 'u3', name: 'Mike Johnson', email: 'mike@example.com', type: 'User', status: 'Active', bookings: 8, joined: 'Jun 2025', lastActive: 'Yesterday' },
    { id: 'u4', name: 'Emma Davis', email: 'emma@example.com', type: 'User', status: 'Active', bookings: 22, joined: 'Aug 2024', lastActive: 'Today' },
    { id: 'u5', name: 'David Chen', email: 'david@example.com', type: 'User', status: 'Inactive', bookings: 3, joined: 'Nov 2025', lastActive: '2 weeks ago' },
    { id: 'u6', name: 'Lisa Wong', email: 'lisa@example.com', type: 'Trainer', status: 'Active', bookings: 67, joined: 'Feb 2024', lastActive: 'Today' },
    { id: 'u7', name: 'Alex Turner', email: 'alex@example.com', type: 'User', status: 'Active', bookings: 12, joined: 'Apr 2025', lastActive: 'Today' },
    { id: 'u8', name: 'Rachel Green', email: 'rachel@example.com', type: 'User', status: 'Blocked', bookings: 0, joined: 'Sep 2024', lastActive: 'Jan 2026' },
  ];
  
  return users.map(u => `
    <div class="flex align-center justify-between" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 12px;">
      <div class="flex align-center gap-4">
        <img src="https://i.pravatar.cc/150?u=${u.id}" alt="${u.name}" style="width: 50px; height: 50px; border-radius: 50%;">
        <div>
          <h4 class="font-medium">${u.name}</h4>
          <p class="text-sm text-muted">${u.email}</p>
          <p class="text-xs text-muted">Joined: ${u.joined}</p>
        </div>
      </div>
      <div class="flex align-center gap-6">
        <div class="text-center">
          <p class="text-lg font-bold">${u.bookings}</p>
          <p class="text-xs text-muted">Bookings</p>
        </div>
        <span class="badge" style="background: ${u.type === 'Trainer' ? 'var(--primary-glow)' : 'var(--glass-border)'}; color: ${u.type === 'Trainer' ? 'var(--primary)' : 'var(--text-muted)'};">${u.type}</span>
        <span class="badge" style="background: ${u.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : u.status === 'Blocked' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; color: ${u.status === 'Active' ? 'var(--success)' : u.status === 'Blocked' ? 'var(--danger)' : 'var(--warning)'};">${u.status}</span>
        <div class="flex gap-2">
          <button class="btn btn-outline btn-sm" onclick="window.notify('Editing ${u.name}', 'info')"><i class="ph-bold ph-pencil-simple"></i></button>
          <button class="btn btn-outline btn-sm text-danger" onclick="window.notify('Blocking ${u.name}', 'error')"><i class="ph-bold ph-prohibit"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}
