export function AdminSlotsPage() {
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Slots <span class="text-gradient">Statistics</span></h1>
        <p class="text-muted">Booking slots and availability</p>
      </div>
      
      <!-- Filters -->
      <div class="glass-card mb-6" style="padding: 1.5rem;">
        <div class="flex gap-4" style="flex-wrap: wrap;">
          <select class="input-field" style="width: auto; min-width: 200px;">
            <option value="all">All Grounds</option>
            <option value="downtown">Downtown Arena</option>
            <option value="westside">Westside Pitch</option>
            <option value="elite">Elite Sports Club</option>
            <option value="madhavaram">Madhavaram Grounds</option>
          </select>
          <select class="input-field" style="width: auto; min-width: 150px;">
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input type="date" class="input-field" style="width: auto;">
          <button class="btn btn-primary">
            <i class="ph-bold ph-plus"></i> Add Slot
          </button>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-calendar-blank text-primary" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Total Slots</p><h4 class="text-2xl font-bold">1,840</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(34, 197, 94, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-check-circle text-success" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Available</p><h4 class="text-2xl font-bold">856</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-calendar-check text-accent" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Booked</p><h4 class="text-2xl font-bold">945</h4></div>
        </div>
        <div class="glass-card flex align-center gap-4">
          <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(239, 68, 68, 0.1); display: flex; align-items: center; justify-content: center;">
            <i class="ph-duotone ph-x-circle text-danger" style="font-size: 1.5rem;"></i>
          </div>
          <div><p class="text-muted text-sm">Cancelled</p><h4 class="text-2xl font-bold">39</h4></div>
        </div>
      </div>
      
      <!-- Slots by Day -->
      <div class="glass-card mb-6">
        <h3 class="text-xl font-heading mb-4">Slots by Day</h3>
        <div class="flex gap-3" style="overflow-x: auto;">
          ${slotsByDayHtml()}
        </div>
      </div>
      
      <!-- Slots List -->
      <div class="glass-card">
        <h3 class="text-xl font-heading mb-4">All Slots</h3>
        <div class="flex flex-column gap-3">
          ${slotsListHtml()}
        </div>
      </div>
    </div>
  `;
}

function slotsByDayHtml() {
  const days = [
    { day: 'Mon', date: '16', total: 120, booked: 85, available: 35 },
    { day: 'Tue', date: '17', total: 120, booked: 72, available: 48 },
    { day: 'Wed', date: '18', total: 120, booked: 90, available: 30 },
    { day: 'Thu', date: '19', total: 120, booked: 68, available: 52 },
    { day: 'Fri', date: '20', total: 120, booked: 105, available: 15 },
    { day: 'Sat', date: '21', total: 140, booked: 130, available: 10 },
    { day: 'Sun', date: '22', total: 140, booked: 118, available: 22 },
  ];
  
  return days.map(d => `
    <div class="glass-card" style="padding: 1.25rem; min-width: 140px;">
      <p class="text-muted text-sm text-center mb-2">${d.day}, ${d.date} Mar</p>
      <div class="flex justify-between mb-1">
        <span class="text-xs text-muted">Booked</span>
        <span class="text-xs font-bold text-accent">${d.booked}</span>
      </div>
      <div style="background: var(--bg-card-hover); border-radius: 4px; height: 8px; margin-bottom: 0.5rem; overflow: hidden;">
        <div style="width: ${(d.booked/d.total)*100}%; background: var(--accent); height: 100%;"></div>
      </div>
      <div class="flex justify-between">
        <span class="text-xs text-muted">Available</span>
        <span class="text-xs font-bold text-success">${d.available}</span>
      </div>
    </div>
  `).join('');
}

function slotsListHtml() {
  const slots = [
    { id: 's1', ground: 'Downtown Arena', game: 'Football', date: '2026-03-23', time: '06:00 - 07:00', price: '₹500', status: 'Available' },
    { id: 's2', ground: 'Downtown Arena', game: 'Football', date: '2026-03-23', time: '07:00 - 08:00', price: '₹500', status: 'Booked' },
    { id: 's3', ground: 'Westside Pitch', game: 'Cricket', date: '2026-03-23', time: '07:00 - 09:00', price: '₹800', status: 'Booked' },
    { id: 's4', ground: 'Elite Sports Club', game: 'Tennis', date: '2026-03-23', time: '08:00 - 09:00', price: '₹400', status: 'Available' },
    { id: 's5', ground: 'Westside Pitch', game: 'Cricket', date: '2026-03-23', time: '09:00 - 11:00', price: '₹1000', status: 'Available' },
    { id: 's6', ground: 'Madhavaram Grounds', game: 'Cricket', date: '2026-03-23', time: '06:00 - 08:00', price: '₹600', status: 'Booked' },
    { id: 's7', ground: 'Downtown Arena', game: 'Badminton', date: '2026-03-23', time: '09:00 - 10:00', price: '₹300', status: 'Available' },
    { id: 's8', ground: 'Elite Sports Club', game: 'Basketball', date: '2026-03-24', time: '06:00 - 08:00', price: '₹700', status: 'Available' },
  ];
  
  return slots.map(s => `
    <div class="flex align-center justify-between" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 12px;">
      <div>
        <h4 class="font-medium">${s.ground}</h4>
        <p class="text-sm text-muted">${s.game} • ${s.date}</p>
      </div>
      <div class="flex align-center gap-6">
        <div class="text-center">
          <p class="font-medium">${s.time}</p>
          <p class="text-sm text-primary">${s.price}</p>
        </div>
        <span class="badge" style="background: ${s.status === 'Available' ? 'rgba(34, 197, 94, 0.1)' : s.status === 'Booked' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; color: ${s.status === 'Available' ? 'var(--success)' : s.status === 'Booked' ? 'var(--accent)' : 'var(--danger)'};">${s.status}</span>
        <div class="flex gap-2">
          <button class="btn btn-outline btn-sm" onclick="window.notify('Editing slot', 'info')"><i class="ph-bold ph-pencil-simple"></i></button>
          <button class="btn btn-outline btn-sm text-danger" onclick="window.notify('Deleting slot', 'error')"><i class="ph-bold ph-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}
