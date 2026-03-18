export function AdminGamesPage() {
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Games <span class="text-gradient">Statistics</span></h1>
        <p class="text-muted">Games played and activity tracking</p>
      </div>
      
      <!-- Filters -->
      <div class="glass-card mb-6" style="padding: 1.5rem;">
        <div class="flex gap-4" style="flex-wrap: wrap;">
          <select class="input-field" style="width: auto; min-width: 200px;">
            <option value="all">All Games</option>
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
            <option value="tennis">Tennis</option>
            <option value="basketball">Basketball</option>
            <option value="badminton">Badminton</option>
          </select>
          <select class="input-field" style="width: auto; min-width: 150px;">
            <option value="all">All Grounds</option>
            <option value="downtown">Downtown Arena</option>
            <option value="westside">Westside Pitch</option>
            <option value="elite">Elite Sports Club</option>
          </select>
          <input type="date" class="input-field" style="width: auto;">
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-game-controller text-primary" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Total Games</p><h4 class="text-2xl font-bold">2,456</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-calendar-check text-accent" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Played Today</p><h4 class="text-2xl font-bold">89</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-clock text-warning" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">This Week</p><h4 class="text-2xl font-bold">567</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-currency-dollar text-danger" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Revenue</p><h4 class="text-2xl font-bold">₹4.2L</h4></div>
        </div>
      </div>
      
      <!-- Games by Day -->
      <div class="glass-card mb-6">
        <h3 class="text-xl font-heading mb-4">Games by Day</h3>
        <div class="flex gap-3" style="overflow-x: auto;">
          ${gamesByDayHtml()}
        </div>
      </div>
      
      <!-- Games List -->
      <div class="glass-card">
        <h3 class="text-xl font-heading mb-4">Recent Games Played</h3>
        <div class="flex flex-column gap-3">
          ${gamesListHtml()}
        </div>
      </div>
    </div>
  `;
}

function gamesByDayHtml() {
  const days = [
    { day: 'Mon', date: '16', games: 45, revenue: 18000 },
    { day: 'Tue', date: '17', games: 38, revenue: 15200 },
    { day: 'Wed', date: '18', games: 52, revenue: 20800 },
    { day: 'Thu', date: '19', games: 41, revenue: 16400 },
    { day: 'Fri', date: '20', games: 67, revenue: 26800 },
    { day: 'Sat', date: '21', games: 89, revenue: 35600 },
    { day: 'Sun', date: '22', games: 76, revenue: 30400 },
  ];
  
  return days.map(d => `
    <div class="glass-card" style="padding: 1.25rem; min-width: 130px; text-align: center;">
      <p class="text-muted text-sm">${d.day}</p>
      <p class="text-xs text-muted">${d.date} Mar</p>
      <h4 class="text-2xl font-heading my-2">${d.games}</h4>
      <p class="text-sm text-primary">₹${(d.revenue / 1000).toFixed(1)}k</p>
    </div>
  `).join('');
}

function gamesListHtml() {
  const games = [
    { id: 'g1', game: 'Football', ground: 'Downtown Arena', user: 'John Doe', date: 'Today', time: '4:00 PM', status: 'Completed', price: '₹500' },
    { id: 'g2', game: 'Cricket', ground: 'Westside Pitch', user: 'Sarah Smith', date: 'Today', time: '6:00 PM', status: 'Completed', price: '₹800' },
    { id: 'g3', game: 'Tennis', ground: 'Elite Sports Club', user: 'Mike Johnson', date: 'Today', time: '5:00 PM', status: 'In Progress', price: '₹400' },
    { id: 'g4', game: 'Basketball', ground: 'Madhavaram Grounds', user: 'Emma Davis', date: 'Yesterday', time: '7:00 PM', status: 'Completed', price: '₹600' },
    { id: 'g5', game: 'Badminton', ground: 'Downtown Arena', user: 'David Chen', date: 'Yesterday', time: '3:00 PM', status: 'Completed', price: '₹300' },
    { id: 'g6', game: 'Football', ground: 'Westside Pitch', user: 'Lisa Wong', date: 'Yesterday', time: '5:00 PM', status: 'Completed', price: '₹500' },
    { id: 'g7', game: 'Cricket', ground: 'Madhavaram Grounds', user: 'Alex Turner', date: '22 Mar', time: '6:00 AM', status: 'Scheduled', price: '₹700' },
  ];
  
  return games.map(g => `
    <div class="flex align-center justify-between" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 12px;">
      <div class="flex align-center gap-4">
        <div style="width: 50px; height: 50px; border-radius: 12px; background: var(--primary-glow); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
          ${getGameIcon(g.game)}
        </div>
        <div>
          <h4 class="font-medium">${g.game}</h4>
          <p class="text-sm text-muted">${g.ground}</p>
        </div>
      </div>
      <div class="flex align-center gap-6">
        <div class="text-center">
          <p class="font-medium">${g.user}</p>
          <p class="text-xs text-muted">${g.date} • ${g.time}</p>
        </div>
        <span class="badge" style="background: ${g.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : g.status === 'In Progress' ? 'var(--primary-glow)' : 'rgba(245, 158, 11, 0.1)'}; color: ${g.status === 'Completed' ? 'var(--success)' : g.status === 'In Progress' ? 'var(--primary)' : 'var(--warning)'};">${g.status}</span>
        <span class="font-medium">${g.price}</span>
      </div>
    </div>
  `).join('');
}

function getGameIcon(game) {
  const icons = {
    'Football': '⚽',
    'Cricket': '🏏',
    'Tennis': '🎾',
    'Basketball': '🏀',
    'Badminton': '🏸'
  };
  return icons[game] || '🎮';
}
