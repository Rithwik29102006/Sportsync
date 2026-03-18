export function UserDashboard() {
  setTimeout(initDashboardLogic, 0);

  return `
    <div class="container page-transition" style="padding-top: 2rem;" id="dashboard-container">
      <div class="flex justify-center align-center" style="min-height: 40vh;">
         <i class="ph-bold ph-spinner animate-spin text-primary text-4xl"></i>
      </div>
    </div>
  `;
}

async function initDashboardLogic() {
  const container = document.getElementById('dashboard-container');
  if(!container) return;

  try {
    // Get user from state with fallback
    const user = window.appState.user || {
      name: 'Guest User',
      avatar: 'https://i.pravatar.cc/150?u=guest',
      stats: {
        gamesPlayed: 0,
        winRate: '0%',
        hoursPlayed: '0h',
        connections: 0
      }
    };
    
    let recentActivities = [];
    try {
      const activitiesRes = await fetch('http://localhost:3000/api/user/activities');
      if (activitiesRes.ok) {
        recentActivities = await activitiesRes.json();
      }
    } catch (e) {
      // Use demo activities if backend is down
      recentActivities = [
        { title: 'Football Match', date: 'Today, 4:00 PM', status: 'Upcoming' },
        { title: 'Tennis Court', date: 'Yesterday, 6:00 PM', status: 'Completed' },
        { title: 'Basketball Game', date: 'Last week', status: 'Completed' }
      ];
    }
    
    const stats = [
      { label: 'Games Played', value: (user.stats?.gamesPlayed || 0).toString(), icon: 'ph-trophy', color: 'var(--primary)' },
      { label: 'Win Rate', value: user.stats?.winRate || '0%', icon: 'ph-trend-up', color: 'var(--success)' },
      { label: 'Hours Played', value: user.stats?.hoursPlayed || '0h', icon: 'ph-clock', color: 'var(--warning)' },
      { label: 'Connections', value: (user.stats?.connections || 0).toString(), icon: 'ph-users', color: 'var(--accent)' }
    ];

  const statCards = stats.map(stat => `
    <div class="glass-card flex align-center gap-4" style="padding: 1.5rem;">
      <div style="width: 50px; height: 50px; border-radius: 12px; background: ${stat.color}20; display: flex; align-items: center; justify-content: center;">
        <i class="ph-duotone ${stat.icon}" style="font-size: 1.8rem; color: ${stat.color};"></i>
      </div>
      <div>
        <p class="text-muted text-sm mb-1">${stat.label}</p>
        <h4 class="text-2xl font-heading leading-tight">${stat.value}</h4>
      </div>
    </div>
  `).join('');

  const activityLines = recentActivities.map(act => `
    <div class="flex align-center justify-between" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
      <div class="flex align-center gap-4">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card-hover); display: flex; align-items: center; justify-content: center;">
          <i class="ph-bold ph-${act.title.includes('Football') ? 'soccer-ball' : act.title.includes('Tennis') ? 'tennis-ball' : 'basketball'} text-muted"></i>
        </div>
        <div>
          <h5 class="font-medium">${act.title}</h5>
          <p class="text-sm text-muted">${act.date}</p>
        </div>
      </div>
      <span class="badge" style="background: ${act.status === 'Upcoming' ? 'var(--primary-glow)' : 'var(--glass-border)'}; color: ${act.status === 'Upcoming' ? 'var(--primary)' : 'var(--text-muted)'};">${act.status}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container page-transition" style="padding-top: 2rem;">
      
      <!-- Profile Header -->
      <div class="glass-card flex align-center justify-between flex-wrap gap-6 mb-8" style="padding: 2rem; background: linear-gradient(to right, rgba(24, 24, 27, 0.8), rgba(99, 102, 241, 0.15)); border-left: 4px solid var(--accent);">
        <div class="flex align-center gap-6">
          <img src="${user.avatar}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid var(--glass-border); box-shadow: var(--shadow-lg);">
          <div>
            <h2 class="text-3xl font-heading mb-2">${user.name}</h2>
            <p class="text-muted flex align-center gap-2">
              <i class="ph-fill ph-map-pin text-primary"></i> New York, NY
            </p>
          </div>
        </div>
        <button class="btn btn-outline" onclick="window.notify('Profile configuration coming soon', 'info')">
          <i class="ph-bold ph-pencil-simple"></i> Edit Profile
        </button>
      </div>

      <!-- Key Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        ${statCards}
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        
        <!-- Activity Feed -->
        <div class="glass-card">
          <div class="flex align-center justify-between mb-6">
            <h3 class="text-xl font-heading flex align-center gap-2">
              <i class="ph-duotone ph-activity text-primary"></i> Recent Activity
            </h3>
            <button class="btn-ghost text-sm">View All</button>
          </div>
          <div style="display: flex; flex-direction: column;">
            ${activityLines}
          </div>
        </div>

        <!-- Connections/Friends Widget -->
        <div class="glass-card">
           <h3 class="text-xl font-heading mb-6 flex align-center gap-2">
              <i class="ph-duotone ph-users text-accent"></i> Top Connections
           </h3>
           <div class="flex flex-column gap-4">
             ${[1, 2, 3].map(i => `
               <div class="flex align-center justify-between">
                 <div class="flex align-center gap-3">
                   <img src="https://i.pravatar.cc/150?u=${i + 10}" style="width: 40px; height: 40px; border-radius: 50%;">
                   <span class="font-medium text-sm">Player ${i}</span>
                 </div>
                 <button class="btn-ghost" style="padding: 0.25rem;"><i class="ph-bold ph-chat-teardrop text-muted"></i></button>
               </div>
             `).join('')}
           </div>
           <button class="btn btn-outline w-full mt-6 text-sm" onclick="window.notify('Finding matches...', 'success')">Find New Partners</button>
        </div>

      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="text-danger">Failed to load dashboard data. Assuming backend is not running.</p>`;
  }
}
