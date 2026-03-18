export function TrainerDashboard() {
  setTimeout(initTrainerDashboardLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;" id="trainer-dashboard-container">
      <div class="flex justify-center align-center" style="min-height: 40vh;">
        <i class="ph-bold ph-spinner animate-spin text-primary text-4xl"></i>
      </div>
    </div>
  `;
}

function initTrainerDashboardLogic() {
  const container = document.getElementById('trainer-dashboard-container');
  if(!container) return;
  
  const trainer = window.appState.user;
  const stats = [
    { label: 'Total Sessions', value: trainer.stats.totalSessions.toString(), icon: 'ph-calendar-check', color: 'var(--primary)' },
    { label: 'Rating', value: trainer.stats.rating, icon: 'ph-star', color: 'var(--warning)' },
    { label: 'Active Students', value: trainer.stats.students.toString(), icon: 'ph-users', color: 'var(--accent)' },
    { label: 'Experience', value: trainer.stats.experience, icon: 'ph-clock', color: 'var(--success)' }
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

  const upcomingSessions = [
    { id: 's1', student: 'Mike Johnson', sport: 'Cricket', date: 'Today', time: '4:00 PM', status: 'Confirmed' },
    { id: 's2', student: 'Sarah Williams', sport: 'Cricket', date: 'Tomorrow', time: '9:00 AM', status: 'Confirmed' },
    { id: 's3', student: 'David Chen', sport: 'Cricket', date: 'Feb 16', time: '10:00 AM', status: 'Pending' }
  ];

  const sessionsHtml = upcomingSessions.map(session => `
    <div class="flex align-center justify-between" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
      <div class="flex align-center gap-4">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card-hover); display: flex; align-items: center; justify-content: center;">
          <i class="ph-bold ph-user text-muted"></i>
        </div>
        <div>
          <h5 class="font-medium">${session.student}</h5>
          <p class="text-sm text-muted">${session.sport} • ${session.date} at ${session.time}</p>
        </div>
      </div>
      <span class="badge" style="background: ${session.status === 'Confirmed' ? 'var(--primary-glow)' : 'var(--warning)'}20; color: ${session.status === 'Confirmed' ? 'var(--primary)' : 'var(--warning)'};">${session.status}</span>
    </div>
  `).join('');

  const reviews = [
    { id: 'r1', student: 'Emma D.', rating: 5, comment: 'Excellent coaching! Very patient and knowledgeable.', date: '2 days ago' },
    { id: 'r2', student: 'James W.', rating: 5, comment: 'Great session. Improved my batting significantly.', date: '1 week ago' },
    { id: 'r3', student: 'Lisa A.', rating: 4, comment: 'Good coaching, very professional.', date: '2 weeks ago' }
  ];

  const reviewsHtml = reviews.map(review => `
    <div class="glass-card" style="padding: 1rem;">
      <div class="flex justify-between align-center mb-2">
        <div class="flex align-center gap-2">
          <span class="font-medium">${review.student}</span>
          <span class="text-warning">${'★'.repeat(review.rating)}</span>
        </div>
        <span class="text-xs text-muted">${review.date}</span>
      </div>
      <p class="text-sm text-muted">${review.comment}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="container page-transition" style="padding-top: 2rem;">
      <!-- Profile Header -->
      <div class="glass-card flex align-center justify-between flex-wrap gap-6 mb-8" style="padding: 2rem; background: linear-gradient(to right, rgba(24, 24, 27, 0.8), rgba(245, 158, 11, 0.15)); border-left: 4px solid var(--warning);">
        <div class="flex align-center gap-6">
          <img src="${trainer.avatar}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; border: 4px solid var(--glass-border); box-shadow: var(--shadow-lg);">
          <div>
            <h2 class="text-3xl font-heading mb-2">${trainer.name}</h2>
            <p class="text-muted flex align-center gap-2">
              <i class="ph-fill ph-sport text-warning"></i> ${trainer.sport.charAt(0).toUpperCase() + trainer.sport.slice(1)} Trainer
            </p>
            <p class="text-sm text-primary mt-2">
              <i class="ph-fill ph-star text-warning"></i> ${trainer.stats.rating} Rating • ${trainer.stats.totalSessions} Sessions Completed
            </p>
          </div>
        </div>
        <button class="btn btn-outline" onclick="window.notify('Profile editing coming soon', 'info')">
          <i class="ph-bold ph-pencil-simple"></i> Edit Profile
        </button>
      </div>

      <!-- Key Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        ${statCards}
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <!-- Upcoming Sessions -->
        <div class="glass-card">
          <div class="flex align-center justify-between mb-6">
            <h3 class="text-xl font-heading flex align-center gap-2">
              <i class="ph-duotone ph-calendar-check text-primary"></i> Upcoming Sessions
            </h3>
            <button class="btn-ghost text-sm">View All</button>
          </div>
          <div style="display: flex; flex-direction: column;">
            ${sessionsHtml}
          </div>
        </div>

        <!-- Recent Reviews -->
        <div class="glass-card">
          <h3 class="text-xl font-heading mb-6 flex align-center gap-2">
            <i class="ph-duotone ph-chat-square-text text-warning"></i> Recent Reviews
          </h3>
          <div class="flex flex-column gap-3">
            ${reviewsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}
