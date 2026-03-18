export function AdminDashboard() {
  setTimeout(initAdminLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;" id="admin-container">
      <div class="flex justify-center align-center" style="min-height: 40vh;">
         <i class="ph-bold ph-spinner animate-spin text-primary text-4xl"></i>
      </div>
    </div>
  `;
}

async function initAdminLogic() {
  const container = document.getElementById('admin-container');
  if(!container) return;

  try {
    const statsRes = await fetch('http://localhost:3000/api/admin/stats');
    if (!statsRes.ok) throw new Error('Failed to load stats');
    const adminStats = await statsRes.json();
    
    const groundsRes = await fetch('http://localhost:3000/api/grounds');
    if (!groundsRes.ok) throw new Error('Failed to load grounds');
    const grounds = await groundsRes.json();
    
    const gamesRes = await fetch('http://localhost:3000/api/games');
    const games = gamesRes.ok ? await gamesRes.json() : [];
    
    // Build grounds HTML
    const groundsHtml = grounds.map(g => `
      <div class="flex align-center justify-between" style="padding: 1rem; border: 1px solid var(--glass-border); border-radius: 12px; background: rgba(255,255,255,0.02);">
        <div class="flex align-center gap-3">
          <div style="width: 40px; height: 40px; border-radius: 8px; background: url('${g.image}') center/cover;"></div>
          <div>
            <h5 class="font-medium">${g.name}</h5>
            <p class="text-xs text-muted">${g.sport} • ${g.activeBookings} Active Bookings</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-outline btn-sm" onclick="editGround('${g.id}')"><i class="ph-bold ph-pencil-simple"></i></button>
          <button class="btn btn-outline btn-sm text-danger" onclick="deleteGround('${g.id}')"><i class="ph-bold ph-trash"></i></button>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="flex align-center justify-between mb-8">
        <div>
          <div class="badge badge-primary mb-2" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); border-color: rgba(239, 68, 68, 0.2);">Admin Portal</div>
          <h2 class="text-3xl font-heading">Platform Overview</h2>
        </div>
      </div>

      <!-- Quick Admin Stats -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-users" style="font-size: 1.8rem; color: var(--primary);"></i>
          </div>
          <div><p class="text-muted text-sm">Total Users</p><h4 class="text-2xl font-bold">${adminStats.totalUsers.toLocaleString()}</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-calendar-check" style="font-size: 1.8rem; color: var(--accent);"></i>
          </div>
          <div><p class="text-muted text-sm">Active Bookings</p><h4 class="text-2xl font-bold">${adminStats.activeBookings}</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-currency-dollar" style="font-size: 1.8rem; color: var(--warning);"></i>
          </div>
          <div><p class="text-muted text-sm">Revenue (Today)</p><h4 class="text-2xl font-bold">$${adminStats.revenueToday.toLocaleString()}</h4></div>
        </div>
      </div>

      <!-- Admin Tabs -->
      <div class="glass-card mb-6">
        <div class="flex gap-2" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem;">
          <button class="btn btn-primary" onclick="switchAdminTab('overview')" id="tab-overview"><i class="ph-bold ph-chart-bar"></i> Overview</button>
          <button class="btn btn-outline" onclick="switchAdminTab('grounds')" id="tab-grounds"><i class="ph-bold ph-map-trifold"></i> Grounds</button>
          <button class="btn btn-outline" onclick="switchAdminTab('games')" id="tab-games"><i class="ph-bold ph-game-controller"></i> Games</button>
          <button class="btn btn-outline" onclick="switchAdminTab('users')" id="tab-users"><i class="ph-bold ph-users"></i> Users</button>
          <button class="btn btn-outline" onclick="switchAdminTab('slots')" id="tab-slots"><i class="ph-bold ph-clock"></i> Slots</button>
          <button class="btn btn-outline" onclick="switchAdminTab('reports')" id="tab-reports"><i class="ph-bold ph-warning"></i> Reports</button>
        </div>
        
        <!-- Overview Section -->
        <div id="admin-overview-section">
          <h3 class="text-xl font-heading mb-4 mt-4">Daily Bookings & Activity</h3>
          
          <!-- Filters -->
          <div class="flex gap-4 mb-6" style="flex-wrap: wrap;">
            <div style="min-width: 200px;">
              <label class="text-sm text-muted mb-1" style="display:block;">Filter by Ground</label>
              <select id="filter-ground" class="input-field" onchange="filterOverview()" style="width: 100%; padding: 0.75rem; border-radius: 8px;">
                <option value="all">All Grounds</option>
                <option value="Downtown Arena">Downtown Arena</option>
                <option value="Westside Pitch">Westside Pitch</option>
                <option value="Elite Sports Club">Elite Sports Club</option>
                <option value="Madhavaram Grounds">Madhavaram Grounds</option>
              </select>
            </div>
            <div style="min-width: 200px;">
              <label class="text-sm text-muted mb-1" style="display:block;">Filter by Game</label>
              <select id="filter-game" class="input-field" onchange="filterOverview()" style="width: 100%; padding: 0.75rem; border-radius: 8px;">
                <option value="all">All Games</option>
                <option value="Football">Football</option>
                <option value="Cricket">Cricket</option>
                <option value="Tennis">Tennis</option>
                <option value="Basketball">Basketball</option>
                <option value="Badminton">Badminton</option>
              </select>
            </div>
          </div>
          
          <!-- Bookings by Day -->
          <div class="mb-6">
            <h4 class="font-heading mb-3">Bookings by Day</h4>
            <div id="bookings-by-day" class="flex gap-3" style="overflow-x: auto; padding-bottom: 0.5rem;">
              ${bookingsByDayHtml()}
            </div>
          </div>
          
          <!-- All Users & Activities -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div>
              <h4 class="font-heading mb-3">All Users</h4>
              <div class="flex flex-column gap-2" style="max-height: 400px; overflow-y: auto;">
                ${allUsersHtml()}
              </div>
            </div>
            <div>
              <h4 class="font-heading mb-3">Recent Games Played</h4>
              <div class="flex flex-column gap-2" style="max-height: 400px; overflow-y: auto;">
                ${gamesPlayedHtml()}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Grounds Management -->
        <div id="admin-grounds-section" style="display:none;">
          <div class="flex align-center justify-between mb-4 mt-4">
            <h3 class="text-xl font-heading">Manage Grounds</h3>
            <button class="btn btn-primary" onclick="window.showAddGroundModal()">
              <i class="ph-bold ph-plus"></i> Add New Ground
            </button>
          </div>
          <div class="flex flex-column gap-3">
            ${groundsHtml}
          </div>
        </div>
        
        <!-- Games Management -->
        <div id="admin-games-section" style="display:none;">
          <div class="flex align-center justify-between mb-4 mt-4">
            <h3 class="text-xl font-heading">Manage Games</h3>
            <button class="btn btn-primary" onclick="window.showAddGameModal()">
              <i class="ph-bold ph-plus"></i> Add New Game
            </button>
          </div>
          <div class="flex flex-column gap-3">
            ${gamesHtml()}
          </div>
        </div>
        
        <!-- Users Management -->
        <div id="admin-users-section" style="display:none;">
          <div class="flex align-center justify-between mb-4 mt-4">
            <h3 class="text-xl font-heading">Manage Users</h3>
            <button class="btn btn-primary" onclick="window.showAddUserModal()">
              <i class="ph-bold ph-plus"></i> Add New User
            </button>
          </div>
          <div class="flex flex-column gap-3">
            ${usersHtml()}
          </div>
        </div>
        
        <!-- Slots Management -->
        <div id="admin-slots-section" style="display:none;">
          <div class="flex align-center justify-between mb-4 mt-4">
            <h3 class="text-xl font-heading">Manage Slots</h3>
            <button class="btn btn-primary" onclick="window.showAddSlotModal()">
              <i class="ph-bold ph-plus"></i> Add New Slot
            </button>
          </div>
          <div class="flex flex-column gap-3">
            ${slotsHtml()}
          </div>
        </div>
        
        <!-- Reports Section -->
        <div id="admin-reports-section" style="display:none;">
          <h3 class="text-xl font-heading mb-4 mt-4">User Reports & Block Requests</h3>
          <div class="flex flex-column gap-3">
            ${reportsHtml()}
          </div>
        </div>
      </div>
    `;
    
    // Make functions global
    window.switchAdminTab = switchAdminTab;
    window.filterOverview = filterOverview;
    window.editGround = editGround;
    window.deleteGround = deleteGround;
    window.showAddGroundModal = showAddGroundModal;
    window.showAddGameModal = showAddGameModal;
    window.showAddUserModal = showAddUserModal;
    window.showAddSlotModal = showAddSlotModal;
  } catch(err) {
    console.error(err);
    container.innerHTML = `<p class="text-danger">Failed to load admin data. Assuming backend is not running.</p>`;
  }
}

function filterOverview() {
  const groundFilter = document.getElementById('filter-ground').value;
  const gameFilter = document.getElementById('filter-game').value;
  
  // Update the overview based on filters
  const bookingsContainer = document.getElementById('bookings-by-day');
  bookingsContainer.innerHTML = bookingsByDayHtml(groundFilter, gameFilter);
}

function bookingsByDayHtml(groundFilter = 'all', gameFilter = 'all') {
  const days = [
    { day: 'Mon', date: '16', bookings: 12, revenue: 4500 },
    { day: 'Tue', date: '17', bookings: 8, revenue: 3200 },
    { day: 'Wed', date: '18', bookings: 15, revenue: 5800 },
    { day: 'Thu', date: '19', bookings: 10, revenue: 4100 },
    { day: 'Fri', date: '20', bookings: 18, revenue: 7200 },
    { day: 'Sat', date: '21', bookings: 25, revenue: 9500 },
    { day: 'Sun', date: '22', bookings: 22, revenue: 8800 },
  ];
  
  return days.map(d => `
    <div class="glass-card" style="padding: 1rem; min-width: 120px; text-align: center;">
      <p class="text-muted text-sm">${d.day}</p>
      <p class="text-xs text-muted">${d.date} Mar</p>
      <h4 class="text-xl font-heading my-2">${d.bookings}</h4>
      <p class="text-sm text-primary">₹${d.revenue.toLocaleString()}</p>
    </div>
  `).join('');
}

function allUsersHtml() {
  const users = [
    { id: 'u1', name: 'John Doe', email: 'user@sportssync.com', type: 'user', bookings: 5, lastActive: 'Today' },
    { id: 'u2', name: 'Sarah Smith', email: 'trainer@sportssync.com', type: 'Trainer', bookings: 12, lastActive: 'Today' },
    { id: 'u3', name: 'Mike Johnson', email: 'mike@example.com', type: 'user', bookings: 3, lastActive: 'Yesterday' },
    { id: 'u4', name: 'Emma Davis', email: 'emma@example.com', type: 'user', bookings: 8, lastActive: '2 days ago' },
    { id: 'u5', name: 'David Chen', email: 'david@example.com', type: 'user', bookings: 2, lastActive: 'Today' },
    { id: 'u6', name: 'Lisa Wong', email: 'lisa@example.com', type: 'Trainer', bookings: 15, lastActive: 'Today' },
  ];
  
  return users.map(u => `
    <div class="flex align-center justify-between" style="padding: 0.75rem; background: var(--bg-card-hover); border-radius: 8px;">
      <div class="flex align-center gap-3">
        <img src="https://i.pravatar.cc/150?u=${u.id}" alt="${u.name}" style="width: 36px; height: 36px; border-radius: 50%;">
        <div>
          <h5 class="font-medium text-sm">${u.name}</h5>
          <p class="text-xs text-muted">${u.email}</p>
        </div>
      </div>
      <div class="flex flex-column align-end">
        <span class="text-xs">${u.bookings} bookings</span>
        <span class="text-xs text-muted">${u.lastActive}</span>
      </div>
    </div>
  `).join('');
}

function gamesPlayedHtml() {
  const games = [
    { id: 'g1', game: 'Football', ground: 'Downtown Arena', user: 'John Doe', time: 'Today, 4:00 PM', status: 'Completed' },
    { id: 'g2', game: 'Cricket', ground: 'Westside Pitch', user: 'Sarah Smith', time: 'Today, 6:00 PM', status: 'Completed' },
    { id: 'g3', game: 'Tennis', ground: 'Elite Sports Club', user: 'Mike Johnson', time: 'Yesterday, 5:00 PM', status: 'Completed' },
    { id: 'g4', game: 'Basketball', ground: 'Madhavaram Grounds', user: 'Emma Davis', time: 'Yesterday, 7:00 PM', status: 'Completed' },
    { id: 'g5', game: 'Badminton', ground: 'Downtown Arena', user: 'David Chen', time: 'Today, 3:00 PM', status: 'In Progress' },
    { id: 'g6', game: 'Football', ground: 'Westside Pitch', user: 'Lisa Wong', time: 'Today, 5:00 PM', status: 'Scheduled' },
  ];
  
  return games.map(g => `
    <div class="flex align-center justify-between" style="padding: 0.75rem; background: var(--bg-card-hover); border-radius: 8px;">
      <div>
        <h5 class="font-medium text-sm">${g.game}</h5>
        <p class="text-xs text-muted">${g.ground}</p>
      </div>
      <div class="flex flex-column align-end">
        <span class="text-xs">${g.user}</span>
        <span class="badge text-xs" style="background: ${g.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : g.status === 'In Progress' ? 'var(--primary-glow)' : 'rgba(245, 158, 11, 0.1)'}; color: ${g.status === 'Completed' ? 'var(--success)' : g.status === 'In Progress' ? 'var(--primary)' : 'var(--warning)'};">${g.status}</span>
      </div>
    </div>
  `).join('');
}

function switchAdminTab(tab) {
  const sections = ['overview', 'grounds', 'games', 'users', 'slots', 'reports'];
  sections.forEach(s => {
    document.getElementById(`admin-${s}-section`).style.display = 'none';
    document.getElementById(`tab-${s}`).className = 'btn btn-outline';
  });
  document.getElementById(`admin-${tab}-section`).style.display = 'block';
  document.getElementById(`tab-${tab}`).className = 'btn btn-primary';
}

function editGround(id) {
  window.notify('Opening edit ground modal for: ' + id, 'info');
}

function deleteGround(id) {
  if (confirm('Are you sure you want to delete this ground?')) {
    window.notify('Ground deleted successfully', 'success');
  }
}

function showAddGroundModal() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div class="glass-card" style="max-width:500px;padding:2rem;border-radius:16px;">
      <h3 class="text-xl font-heading mb-4">Add New Ground</h3>
      <form onsubmit="event.preventDefault();window.notify('Ground added successfully','success');this.closest('[style*=\\"fixed\\"]').remove();">
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Ground Name</label>
          <input type="text" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Sport Type</label>
          <select class="input-field" style="width:100%;padding:0.75rem;border-radius:8px;">
            <option>Football</option>
            <option>Cricket</option>
            <option>Tennis</option>
            <option>Basketball</option>
            <option>Badminton</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Location</label>
          <input type="text" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Price per Hour (₹)</label>
          <input type="number" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Image URL</label>
          <input type="url" class="input-field" placeholder="https://..." style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary" style="flex:1;">Add Ground</button>
          <button type="button" class="btn btn-outline" onclick="this.closest('[style*=\\"fixed\\"]').remove()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

function showAddGameModal() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div class="glass-card" style="max-width:450px;padding:2rem;border-radius:16px;">
      <h3 class="text-xl font-heading mb-4">Add New Game</h3>
      <form onsubmit="event.preventDefault();window.notify('Game added successfully','success');this.closest('[style*=\\"fixed\\"]').remove();">
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Game Name</label>
          <input type="text" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Description</label>
          <textarea class="input-field" rows="2" style="width:100%;padding:0.75rem;border-radius:8px;resize:vertical;"></textarea>
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Icon</label>
          <select class="input-field" style="width:100%;padding:0.75rem;border-radius:8px;">
            <option>⚽ Football</option>
            <option>🏏 Cricket</option>
            <option>🎾 Tennis</option>
            <option>🏀 Basketball</option>
            <option>🏸 Badminton</option>
            <option>🏊 Swimming</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary" style="flex:1;">Add Game</button>
          <button type="button" class="btn btn-outline" onclick="this.closest('[style*=\\"fixed\\"]').remove()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

function showAddUserModal() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div class="glass-card" style="max-width:500px;padding:2rem;border-radius:16px;">
      <h3 class="text-xl font-heading mb-4">Add New User</h3>
      <form onsubmit="event.preventDefault();window.notify('User added successfully','success');this.closest('[style*=\\"fixed\\"]').remove();">
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Full Name</label>
          <input type="text" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Email</label>
          <input type="email" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">User Type</label>
          <select class="input-field" style="width:100%;padding:0.75rem;border-radius:8px;">
            <option value="user">User</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Phone</label>
          <input type="tel" class="input-field" style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary" style="flex:1;">Add User</button>
          <button type="button" class="btn btn-outline" onclick="this.closest('[style*=\\"fixed\\"]').remove()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

function showAddSlotModal() {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  modal.innerHTML = `
    <div class="glass-card" style="max-width:450px;padding:2rem;border-radius:16px;">
      <h3 class="text-xl font-heading mb-4">Add New Slot</h3>
      <form onsubmit="event.preventDefault();window.notify('Slot added successfully','success');this.closest('[style*=\\"fixed\\"]').remove();">
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Ground</label>
          <select class="input-field" style="width:100%;padding:0.75rem;border-radius:8px;">
            <option>Downtown Arena</option>
            <option>Westside Pitch</option>
            <option>Elite Sports Club</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Date</label>
          <input type="date" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Start Time</label>
          <input type="time" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">End Time</label>
          <input type="time" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Price (₹)</label>
          <input type="number" class="input-field" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary" style="flex:1;">Add Slot</button>
          <button type="button" class="btn btn-outline" onclick="this.closest('[style*=\\"fixed\\"]').remove()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

function gamesHtml() {
  const games = [
    { id: 'g1', name: 'Football', icon: '⚽', grounds: 5, bookings: 120 },
    { id: 'g2', name: 'Cricket', icon: '🏏', grounds: 8, bookings: 200 },
    { id: 'g3', name: 'Tennis', icon: '🎾', grounds: 12, bookings: 85 },
    { id: 'g4', name: 'Basketball', icon: '🏀', grounds: 6, bookings: 95 },
    { id: 'g5', name: 'Badminton', icon: '🏸', grounds: 15, bookings: 150 },
  ];
  
  return games.map(g => `
    <div class="flex align-center justify-between" style="padding: 1rem; border: 1px solid var(--glass-border); border-radius: 12px; background: rgba(255,255,255,0.02);">
      <div class="flex align-center gap-3">
        <div style="width: 40px; height: 40px; border-radius: 8px; background: var(--primary-glow); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
          ${g.icon}
        </div>
        <div>
          <h5 class="font-medium">${g.name}</h5>
          <p class="text-xs text-muted">${g.grounds} Grounds • ${g.bookings} Bookings</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm" onclick="window.notify('Editing ${g.name}', 'info')"><i class="ph-bold ph-pencil-simple"></i></button>
        <button class="btn btn-outline btn-sm text-danger" onclick="if(confirm('Delete ${g.name}?'))window.notify('${g.name} deleted', 'success')"><i class="ph-bold ph-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function usersHtml() {
  const users = [
    { id: 'u1', name: 'John Doe', email: 'user@sportssync.com', type: 'user', status: 'Active' },
    { id: 'u2', name: 'Sarah Smith', email: 'trainer@sportssync.com', type: 'Trainer', status: 'Active' },
    { id: 'u3', name: 'Mike Johnson', email: 'mike@example.com', type: 'user', status: 'Active' },
    { id: 'u4', name: 'Emma Davis', email: 'emma@example.com', type: 'user', status: 'Inactive' },
  ];
  
  return users.map(u => `
    <div class="flex align-center justify-between" style="padding: 1rem; border: 1px solid var(--glass-border); border-radius: 12px; background: rgba(255,255,255,0.02);">
      <div class="flex align-center gap-3">
        <img src="https://i.pravatar.cc/150?u=${u.id}" alt="${u.name}" style="width: 40px; height: 40px; border-radius: 50%;">
        <div>
          <h5 class="font-medium">${u.name}</h5>
          <p class="text-xs text-muted">${u.email}</p>
        </div>
      </div>
      <div class="flex align-center gap-3">
        <span class="badge" style="background: ${u.type === 'Trainer' ? 'var(--primary-glow)' : 'var(--glass-border)'}; color: ${u.type === 'Trainer' ? 'var(--primary)' : 'var(--text-muted)'};">${u.type}</span>
        <span class="badge" style="background: ${u.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${u.status === 'Active' ? 'var(--success)' : 'var(--danger)'};">${u.status}</span>
        <button class="btn btn-outline btn-sm" onclick="window.notify('Editing profile: ${u.name}', 'info')"><i class="ph-bold ph-pencil-simple"></i></button>
      </div>
    </div>
  `).join('');
}

function slotsHtml() {
  const slots = [
    { id: 's1', ground: 'Downtown Arena', game: 'Football', date: '2026-03-15', time: '06:00 - 07:00', price: '₹500', status: 'Available' },
    { id: 's2', ground: 'Westside Pitch', game: 'Cricket', date: '2026-03-15', time: '07:00 - 09:00', price: '₹800', status: 'Booked' },
    { id: 's3', ground: 'Elite Sports Club', game: 'Tennis', date: '2026-03-16', time: '08:00 - 09:00', price: '₹400', status: 'Available' },
    { id: 's4', ground: 'Madhavaram Grounds', game: 'Cricket', date: '2026-03-16', time: '06:00 - 08:00', price: '₹600', status: 'Available' },
  ];
  
  return slots.map(s => `
    <div class="flex align-center justify-between" style="padding: 1rem; border: 1px solid var(--glass-border); border-radius: 12px; background: rgba(255,255,255,0.02);">
      <div>
        <h5 class="font-medium">${s.ground}</h5>
        <p class="text-xs text-muted">${s.game} • ${s.date} • ${s.time}</p>
      </div>
      <div class="flex align-center gap-3">
        <span class="font-medium">${s.price}</span>
        <span class="badge" style="background: ${s.status === 'Available' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)'}; color: ${s.status === 'Available' ? 'var(--success)' : 'var(--warning)'};">${s.status}</span>
        <button class="btn btn-outline btn-sm" onclick="window.notify('Editing slot', 'info')"><i class="ph-bold ph-pencil-simple"></i></button>
        <button class="btn btn-outline btn-sm text-danger" onclick="if(confirm('Delete this slot?'))window.notify('Slot deleted', 'success')"><i class="ph-bold ph-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function reportsHtml() {
  const reports = [
    { id: 'r1', reporter: 'John Doe', reported: 'Mike Ross', reason: 'Harassment', details: 'Sending inappropriate messages', status: 'Pending', date: 'Feb 14, 2026' },
    { id: 'r2', reporter: 'Sarah Smith', reported: 'Rachel Green', reason: 'Spam', details: 'Promoting fake services', status: 'Pending', date: 'Feb 13, 2026' },
    { id: 'r3', reporter: 'David Chen', reported: 'Alex Turner', reason: 'Fake Profile', details: 'Profile information is false', status: 'Resolved', date: 'Feb 10, 2026' },
    { id: 'r4', reporter: 'Emma Davis', reported: 'Sam Wilson', reason: 'Inappropriate Behavior', details: 'Using offensive language', status: 'Pending', date: 'Feb 12, 2026' },
  ];
  
  if (reports.length === 0) {
    return '<p class="text-muted">No reports submitted yet.</p>';
  }
  
  return reports.map(r => `
    <div style="padding: 1rem; background: var(--bg-card-hover); border-radius: 8px; border-left: 3px solid ${r.status === 'Pending' ? 'var(--warning)' : 'var(--success)'};">
      <div class="flex align-center justify-between mb-2">
        <div class="flex align-center gap-2">
          <span class="font-medium">${r.reported}</span>
          <i class="ph-bold ph-arrow-right text-sm text-muted"></i>
          <span class="text-muted">Reported by ${r.reporter}</span>
        </div>
        <span class="badge" style="background: ${r.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)'}; color: ${r.status === 'Pending' ? 'var(--warning)' : 'var(--success)'};">${r.status}</span>
      </div>
      <p class="text-sm"><strong>Reason:</strong> ${r.reason}</p>
      <p class="text-sm text-muted mb-2">${r.details}</p>
      <p class="text-xs text-muted">${r.date}</p>
      <div class="flex gap-2 mt-3">
        <button class="btn btn-outline btn-sm" onclick="window.notify('Action taken on ${r.reported}', 'success')">
          <i class="ph-bold ph-check"></i> Resolve
        </button>
        <button class="btn btn-outline btn-sm text-danger" onclick="window.notify('Blocked ${r.reported}', 'error')">
          <i class="ph-bold ph-prohibit"></i> Block User
        </button>
      </div>
    </div>
  `).join('');
}
