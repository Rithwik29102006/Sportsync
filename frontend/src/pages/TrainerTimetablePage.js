export function TrainerTimetablePage() {
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">My <span class="text-gradient">Timetable</span></h1>
        <p class="text-muted">Schedule of your upcoming classes</p>
      </div>
      
      <!-- Week Overview -->
      <div class="flex gap-2 mb-6" style="overflow-x: auto; padding-bottom: 0.5rem;">
        ${weekDaysHtml()}
      </div>
      
      <!-- Today's Schedule -->
      <div class="glass-card">
        <h3 class="text-xl font-heading mb-4">Today's Schedule</h3>
        <div class="timetable-grid">
          ${timetableHtml()}
        </div>
      </div>
    </div>
  `;
}

function weekDaysHtml() {
  const days = [
    { name: 'Mon', date: '16', active: true },
    { name: 'Tue', date: '17', active: false },
    { name: 'Wed', date: '18', active: false },
    { name: 'Thu', date: '19', active: false },
    { name: 'Fri', date: '20', active: false },
    { name: 'Sat', date: '21', active: false },
    { name: 'Sun', date: '22', active: false },
  ];
  
  return days.map(day => `
    <button class="btn ${day.active ? 'btn-primary' : 'btn-outline'}" style="min-width: 60px; padding: 0.75rem;">
      <div class="text-sm">${day.name}</div>
      <div class="font-heading">${day.date}</div>
    </button>
  `).join('');
}

function timetableHtml() {
  const classes = [
    { id: 1, time: '06:00 AM', endTime: '07:30 AM', student: 'Emma Davis', sport: 'Cricket', ground: 'Madhavaram Grounds', location: 'North Chennai', distance: '2.5 km', travelTime: '15 min', status: 'Completed' },
    { id: 2, time: '08:00 AM', endTime: '09:30 AM', student: 'Mike Johnson', sport: 'Cricket', ground: 'Vasanth Vihar Park', location: 'Anna Nagar', distance: '4.2 km', travelTime: '25 min', status: 'Completed' },
    { id: 3, time: '10:00 AM', endTime: '11:30 AM', student: 'Sarah Williams', sport: 'Cricket', ground: 'Corporation Grounds', location: 'Broadway', distance: '6.1 km', travelTime: '35 min', status: 'In Progress' },
    { id: 4, time: '02:00 PM', endTime: '03:30 PM', student: 'David Chen', sport: 'Cricket', ground: 'Marina Beach Courts', location: 'Marina', distance: '8.5 km', travelTime: '45 min', status: 'Upcoming' },
    { id: 5, time: '04:00 PM', endTime: '05:30 PM', student: 'James Wilson', sport: 'Cricket', ground: ' YMCA Ground', location: 'T. Nagar', distance: '5.3 km', travelTime: '30 min', status: 'Upcoming' },
  ];
  
  return classes.map(cls => `
    <div class="class-card" style="display: grid; grid-template-columns: 100px 1fr 200px 150px; gap: 1rem; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; background: ${cls.status === 'In Progress' ? 'var(--primary-glow)' : 'var(--bg-card-hover)'}; border: 1px solid ${cls.status === 'In Progress' ? 'var(--primary)' : 'var(--glass-border)'};">
      <div>
        <p class="font-heading text-lg">${cls.time}</p>
        <p class="text-sm text-muted">${cls.endTime}</p>
        <span class="badge mt-2" style="background: ${getStatusColor(cls.status)}; color: white;">${cls.status}</span>
      </div>
      <div>
        <h4 class="font-heading">${cls.student}</h4>
        <p class="text-sm text-muted">${cls.sport}</p>
        <p class="text-sm"><i class="ph-bold ph-map-pin"></i> ${cls.ground}</p>
      </div>
      <div>
        <p class="text-sm"><i class="ph-bold ph-map-trifold"></i> ${cls.location}</p>
        <p class="text-sm text-muted">${cls.distance}</p>
      </div>
      <div class="flex flex-column gap-2">
        <button class="btn btn-outline btn-sm" onclick="window.notify('Navigation started to ${cls.ground}', 'success')">
          <i class="ph-bold ph-navigation-arrow"></i> Navigate
        </button>
        <button class="btn btn-outline btn-sm" onclick="window.notify('Contacting ${cls.student}', 'info')">
          <i class="ph-bold ph-phone"></i> Contact
        </button>
      </div>
    </div>
  `).join('');
}

function getStatusColor(status) {
  switch(status) {
    case 'Completed': return 'var(--success)';
    case 'In Progress': return 'var(--primary)';
    case 'Upcoming': return 'var(--warning)';
    default: return 'var(--glass-border)';
  }
}
