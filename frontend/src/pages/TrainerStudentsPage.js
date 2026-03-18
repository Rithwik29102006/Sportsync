export function TrainerStudentsPage() {
  setTimeout(initStudentsLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">My <span class="text-gradient">Students</span></h1>
        <p class="text-muted">Manage your students and their progress</p>
      </div>
      
      <!-- Stats -->
      <div class="flex gap-4 mb-6" style="flex-wrap: wrap;">
        <div class="glass-card" style="padding: 1.5rem; min-width: 150px;">
          <p class="text-muted text-sm">Total Students</p>
          <h3 class="text-2xl font-heading">42</h3>
        </div>
        <div class="glass-card" style="padding: 1.5rem; min-width: 150px;">
          <p class="text-muted text-sm">Active</p>
          <h3 class="text-2xl font-heading text-primary">28</h3>
        </div>
        <div class="glass-card" style="padding: 1.5rem; min-width: 150px;">
          <p class="text-muted text-sm">New This Week</p>
          <h3 class="text-2xl font-heading text-warning">5</h3>
        </div>
      </div>
      
      <!-- Students List -->
      <div id="students-list" class="flex flex-column gap-4"></div>
    </div>
  `;
}

const studentsData = [
  { id: 's1', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=mike', sport: 'Cricket', progress: 75, sessions: 12, lastSession: 'Yesterday', status: 'Active' },
  { id: 's2', name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?u=sarah', sport: 'Cricket', progress: 60, sessions: 8, lastSession: '2 days ago', status: 'Active' },
  { id: 's3', name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=david', sport: 'Cricket', progress: 45, sessions: 5, lastSession: '1 week ago', status: 'Active' },
  { id: 's4', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?u=emma', sport: 'Cricket', progress: 90, sessions: 20, lastSession: 'Today', status: 'Active' },
  { id: 's5', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james', sport: 'Cricket', progress: 30, sessions: 3, lastSession: '2 weeks ago', status: 'Inactive' },
];

function initStudentsLogic() {
  const container = document.getElementById('students-list');
  
  container.innerHTML = studentsData.map(student => `
    <div class="glass-card flex gap-4 align-center" style="padding: 1.5rem;">
      <img src="${student.avatar}" alt="${student.name}" style="width: 60px; height: 60px; border-radius: 50%;">
      <div style="flex: 1;">
        <div class="flex justify-between align-center mb-2">
          <h3 class="font-heading">${student.name}</h3>
          <span class="badge ${student.status === 'Active' ? 'badge-primary' : ''}" style="background: ${student.status === 'Active' ? 'var(--primary-glow)' : 'var(--glass-border)'}; color: ${student.status === 'Active' ? 'var(--primary)' : 'var(--text-muted)'};">${student.status}</span>
        </div>
        <p class="text-sm text-muted mb-2">${student.sport} • ${student.sessions} sessions completed • Last: ${student.lastSession}</p>
        <div style="background: var(--bg-card-hover); border-radius: 8px; height: 8px; overflow: hidden;">
          <div style="width: ${student.progress}%; background: var(--primary); height: 100%;"></div>
        </div>
        <p class="text-xs text-muted mt-1">Progress: ${student.progress}%</p>
      </div>
      <div class="flex flex-column gap-2">
        <button class="btn btn-outline btn-sm" onclick="window.notify('Message sent to ${student.name}', 'success')"><i class="ph-bold ph-chat-teardrop"></i> Message</button>
        <button class="btn btn-outline btn-sm" onclick="viewProgress('${student.id}')"><i class="ph-bold ph-chart-line-up"></i> View Progress</button>
      </div>
    </div>
  `).join('');
}

window.viewProgress = function(studentId) {
  window.notify('Progress details coming soon', 'info');
};
