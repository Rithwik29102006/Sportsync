import { API_ENDPOINTS } from '../config/api.js';

export function SlotsPage() {
  setTimeout(initSlotsLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Book Your <span class="text-gradient">Slot</span></h1>
        <p class="text-muted">Choose a ground and select your preferred time slot</p>
      </div>
      
      <!-- City and Sport Filter -->
      <div class="glass-card mb-6" style="padding: 1.5rem;">
        <div class="flex gap-4 align-center" style="flex-wrap: wrap;">
          <div style="min-width: 200px;">
            <label class="text-sm text-muted mb-2" style="display: block;">Select Sport</label>
            <div class="flex gap-2" style="flex-wrap: wrap;">
              <button class="sport-filter-btn btn btn-primary btn-sm" data-sport="all">All</button>
              <button class="sport-filter-btn btn btn-outline btn-sm" data-sport="Football">⚽ Football</button>
              <button class="sport-filter-btn btn btn-outline btn-sm" data-sport="Cricket">🏏 Cricket</button>
              <button class="sport-filter-btn btn btn-outline btn-sm" data-sport="Tennis">🎾 Tennis</button>
              <button class="sport-filter-btn btn btn-outline btn-sm" data-sport="Basketball">🏀 Basketball</button>
            </div>
          </div>
          <div style="min-width: 200px;">
            <label class="text-sm text-muted mb-2" style="display: block;">Availability</label>
            <div class="flex gap-2" style="flex-wrap: wrap;">
              <button class="avail-filter-btn btn btn-primary btn-sm" data-avail="all">All</button>
              <button class="avail-filter-btn btn btn-outline btn-sm" data-avail="available">✅ Available</button>
              <button class="avail-filter-btn btn btn-outline btn-sm" data-avail="booked">❌ Booked</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ground Cards Grid -->
      <div id="grounds-grid" class="flex flex-column gap-6">
        <div class="flex justify-center" style="padding: 3rem;">
          <i class="ph-bold ph-spinner animate-spin text-primary text-4xl"></i>
        </div>
      </div>
    </div>
  `;
}

// Fetch grounds from API
let groundsData = [];
let slotsData = [];

async function fetchGroundsAndSlots() {
  try {
    // Fetch grounds
    const groundsRes = await fetch(API_ENDPOINTS.grounds);
    if (groundsRes.ok) {
      groundsData = await groundsRes.json();
    }
    
    // Fetch slots
    const slotsRes = await fetch(API_ENDPOINTS.slots);
    if (slotsRes.ok) {
      slotsData = await slotsRes.json();
    } else {
      slotsData = getDefaultSlots();
    }
    
    renderGrounds();
  } catch (err) {
    console.error('Failed to fetch data:', err);
    // Use default data as fallback
    groundsData = getDefaultGrounds();
    slotsData = getDefaultSlots();
    renderGrounds();
  }
}

function getDefaultGrounds() {
  return [
    { id: 'g1', name: 'Downtown Arena', sport: 'Football', address: '123 Main St', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80', rating: 4.5, price: 1500 },
    { id: 'g2', name: 'Westside Pitch', sport: 'Tennis', address: '456 West Ave', image: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=600&q=80', rating: 4.2, price: 800 },
    { id: 'g3', name: 'Central Court', sport: 'Basketball', address: '789 Center Blvd', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80', rating: 4.8, price: 1200 },
    { id: 'g4', name: 'Riverside Ground', sport: 'Cricket', address: '321 River Rd', image: 'https://images.unsplash.com/photo-1531415074968-b074b837a6b3?w=600&q=80', rating: 4.6, price: 2000 }
  ];
}

function getDefaultSlots() {
  const slots = [];
  const grounds = ['g1', 'g2', 'g3', 'g4'];
  const times = ['06:00', '07:00', '08:00', '09:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
  
  grounds.forEach(gId => {
    times.forEach((time, index) => {
      slots.push({
        id: `s-${gId}-${index}`,
        groundId: gId,
        time: time,
        price: 500 + (Math.floor(Math.random() * 10) * 100),
        available: Math.random() > 0.3
      });
    });
  });
  return slots;
}

let currentFilter = 'all';
let currentAvailFilter = 'all';
let selectedGround = null;
let selectedSlot = null;

function initSlotsLogic() {
  fetchGroundsAndSlots();
  setupFilterListeners();
}

function setupFilterListeners() {
  document.querySelectorAll('.sport-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sport-filter-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      currentFilter = btn.getAttribute('data-sport');
      renderGrounds();
    });
  });
  
  document.querySelectorAll('.avail-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.avail-filter-btn').forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      currentAvailFilter = btn.getAttribute('data-avail');
      renderGrounds();
    });
  });
}

function renderGrounds() {
  const container = document.getElementById('grounds-grid');
  let filteredGrounds = groundsData;
  if (currentFilter !== 'all') {
    filteredGrounds = filteredGrounds.filter(g => g.sport === currentFilter);
  }
  
  // Filter by availability
  let filteredByAvail = filteredGrounds;
  if (currentAvailFilter === 'available') {
    filteredByAvail = filteredGrounds.filter(g => {
      const groundSlots = slotsData.filter(s => s.groundId === g.id && s.available);
      return groundSlots.length > 0;
    });
  } else if (currentAvailFilter === 'booked') {
    filteredByAvail = filteredGrounds.filter(g => {
      const groundSlots = slotsData.filter(s => s.groundId === g.id && !s.available);
      return groundSlots.length > 0;
    });
  }
  
  if (filteredByAvail.length === 0) {
    container.innerHTML = `<div class="glass-card text-center" style="padding: 3rem;"><i class="ph-duotone ph-map-trifold text-6xl text-muted mb-4"></i><h3 class="text-xl mb-2">No grounds found</h3><p class="text-muted">Try selecting a different sport or availability filter</p></div>`;
    return;
  }
  
  container.innerHTML = filteredByAvail.map(ground => {
    const groundSlots = slotsData.filter(s => s.groundId === ground.id);
    return `
    <div class="glass-card" style="padding: 0; overflow: hidden;">
      <div class="flex" style="flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px; position: relative;">
          <img src="${ground.image}" alt="${ground.name}" style="width: 100%; height: 250px; object-fit: cover;">
          <div class="flex align-center gap-2" style="position: absolute; top: 1rem; left: 1rem;">
            <span class="badge" style="background: rgba(0,0,0,0.7);">${getSportIcon(ground.sport)} ${ground.sport}</span>
          </div>
          <div class="flex align-center gap-1" style="position: absolute; top: 1rem; right: 1rem;">
            <span class="badge" style="background: rgba(0,0,0,0.7);"><i class="ph-fill ph-star text-warning"></i> ${ground.rating}</span>
          </div>
        </div>
        <div style="flex: 1; min-width: 300px; padding: 1.5rem;">
          <h3 class="text-xl font-heading mb-2">${ground.name}</h3>
          <p class="text-sm text-muted mb-2 flex align-center gap-2"><i class="ph-bold ph-map-pin"></i> ${ground.address || 'Address not available'}</p>
          <div class="mb-4">
            <p class="text-sm text-muted mb-2">Available Slots</p>
            <div class="flex gap-2" style="flex-wrap: wrap;">
              ${groundSlots.length > 0 ? groundSlots.slice(0, 6).map(slot => `<button class="slot-btn btn ${slot.available ? 'btn-outline' : 'btn-ghost'} btn-sm" data-ground-id="${ground.id}" data-slot-id="${slot.id}" data-time="${slot.time}" data-price="${slot.price}" ${!slot.available ? 'disabled' : ''} style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">${slot.time}</button>`).join('') : '<span class="text-sm text-muted">No slots available</span>'}
            </div>
          </div>
          <div class="flex justify-between align-center">
            <div><span class="text-2xl font-heading text-primary">₹${ground.price}</span><span class="text-sm text-muted">/hour</span></div>
            <button class="btn btn-primary" onclick="viewAllSlots('${ground.id}')">View All Slots</button>
          </div>
        </div>
      </div>
    </div>
  `}).join('');
  
  document.querySelectorAll('.slot-btn').forEach(btn => {
    btn.addEventListener('click', () => selectSlot(btn.getAttribute('data-ground-id'), btn.getAttribute('data-slot-id'), btn.getAttribute('data-time'), btn.getAttribute('data-price')));
  });
}

function getSportIcon(sport) {
  const icons = { Football: '⚽', Cricket: '🏏', Tennis: '🎾', Basketball: '🏀', Badminton: '🏸' };
  return icons[sport] || '🏃';
}

function generateTimeSlots() {
  const slots = [];
  for (let h = 6; h <= 22; h++) {
    slots.push({ id: `slot${h}`, time: `${h.toString().padStart(2, '0')}:00`, available: Math.random() > 0.3 });
  }
  return slots;
}

function selectSlot(groundId, slotId, time, price) {
  selectedGround = groundsData.find(g => g.id === groundId);
  selectedSlot = { id: slotId, time, price };
  
  // Show confirmation
  if (confirm(`Book ${selectedGround.name} at ${time} for ₹${price}?`)) {
    bookSlot(slotId);
  }
}

async function bookSlot(slotId) {
  if (!selectedGround || !selectedSlot) return;
  try {
    const res = await fetch(API_ENDPOINTS.bookSlot, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        slotId: slotId,
        userId: window.appState.user?.id || '1',
        sport: selectedGround.sport,
        ground: selectedGround.name,
        time: selectedSlot.time,
        price: parseInt(selectedSlot.price)
      })
    });
    
    if (res.ok) {
      const data = await res.json();
      window.notify('Slot booked successfully!', 'success');
      fetchGroundsAndSlots(); // Refresh
    } else {
      window.notify('Failed to book slot', 'error');
    }
  } catch (err) {
    console.error('Booking error:', err);
    window.notify('Booking failed', 'error');
  }
}

window.viewAllSlots = function(groundId) {
  const ground = groundsData.find(g => g.id === groundId);
  if (!ground) return;
  
  const groundSlots = slotsData.filter(s => s.groundId === ground.id);
  alert(`All slots for ${ground.name}:\\n${groundSlots.map(s => `${s.time} - ${s.available ? 'Available' : 'Booked'}`).join('\\n')}`);
};
