export function TrainerBookingPage() {
  setTimeout(initTrainerLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Book a <span class="text-gradient">Trainer</span></h1>
        <p class="text-muted">Learn from professional trainers for all outdoor sports in India</p>
      </div>
      
      <!-- Filters -->
      <div class="glass-card mb-6" style="padding: 1.5rem;">
        <div class="flex gap-4 align-center" style="flex-wrap: wrap;">
          <div style="min-width: 180px;">
            <label class="text-sm text-muted mb-2" style="display: block;">Select City</label>
            <select id="trainer-city" class="input-field">
              <option value="all">All Cities</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
              <option value="kolkata">Kolkata</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
            </select>
          </div>
          
          <div style="flex: 1;">
            <label class="text-sm text-muted mb-2" style="display: block;">Select Sport</label>
            <div class="flex gap-2" style="flex-wrap: wrap;">
              <button class="trainer-sport-btn btn btn-primary btn-sm" data-sport="all">All</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="football">⚽ Football</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="cricket">🏏 Cricket</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="tennis">🎾 Tennis</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="basketball">🏀 Basketball</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="badminton">🏸 Badminton</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="hockey">🏑 Hockey</button>
              <button class="trainer-sport-btn btn btn-outline btn-sm" data-sport="swimming">🏊 Swimming</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Trainers Grid -->
      <div id="trainers-grid" class="flex flex-column gap-6">
        <div class="flex justify-center" style="padding: 3rem;">
          <i class="ph-bold ph-spinner animate-spin text-primary text-4xl"></i>
        </div>
      </div>
      
      <!-- Trainer Booking Modal -->
      <div id="trainer-modal" class="modal-overlay" style="display: none;">
        <div class="glass-card modal-content" style="max-width: 550px; padding: 2rem;">
          <div class="flex justify-between align-center mb-6">
            <h3 class="text-xl font-heading">Book Trainer Session</h3>
            <button class="btn-ghost" onclick="closeTrainerModal()">
              <i class="ph-bold ph-x text-xl"></i>
            </button>
          </div>
          
          <div id="trainer-details" class="mb-6"></div>
          
          <form id="booking-form" class="flex flex-column gap-4">
            <div>
              <label class="text-sm text-muted mb-2" style="display: block;">Select Date</label>
              <input type="date" id="booking-date" class="input-field" required>
            </div>
            
            <div>
              <label class="text-sm text-muted mb-2" style="display: block;">Select Time Slot</label>
              <select id="booking-time" class="input-field" required>
                <option value="">Select Time</option>
                <option value="6:00 AM">6:00 AM</option>
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
              </select>
            </div>
            
            <div>
              <label class="text-sm text-muted mb-2" style="display: block;">Session Type</label>
              <select id="session-type" class="input-field">
                <option value="1">1 Session (1 hour)</option>
                <option value="5">5 Sessions Package</option>
                <option value="10">10 Sessions Package</option>
              </select>
            </div>
            
            <div>
              <label class="text-sm text-muted mb-2" style="display: block;">Your Level</label>
              <select id="player-level" class="input-field">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <button type="submit" class="btn btn-primary w-full" style="padding: 1rem;">
              <i class="ph-bold ph-calendar-check"></i> Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

// Trainers data
const trainersData = [
  {
    id: 'tr1',
    name: 'Rahul Sharma',
    sport: 'cricket',
    city: 'mumbai',
    image: 'https://i.pravatar.cc/150?u=rahul',
    rating: 4.9,
    reviews: 234,
    experience: '15 years',
    price: 2500,
    specialization: ['Batting', 'Bowling', 'Fielding'],
    bio: 'Former Ranji Trophy player with expertise in all aspects of cricket.',
    certifications: ['BCCI Level 2', 'Sports Science Certified'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: 'tr2',
    name: 'Carlos Silva',
    sport: 'football',
    city: 'bangalore',
    image: 'https://i.pravatar.cc/150?u=carlos',
    rating: 4.8,
    reviews: 189,
    experience: '12 years',
    price: 2000,
    specialization: ['Dribbling', 'Passing', 'Tactical Play'],
    bio: 'International playing experience with ISL team. Specializes in attacking play.',
    certifications: ['UEFA A License', 'AFC A License'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'tr3',
    name: 'Priya Patel',
    sport: 'badminton',
    city: 'delhi',
    image: 'https://i.pravatar.cc/150?u=priya',
    rating: 4.9,
    reviews: 312,
    experience: '10 years',
    price: 1500,
    specialization: ['Smash', 'Drop Shot', 'Net Play'],
    bio: 'National level player turned coach. Expert in doubles and singles.',
    certifications: ['BAI Certified Coach'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: 'tr4',
    name: 'Vikram Singh',
    sport: 'tennis',
    city: 'mumbai',
    image: 'https://i.pravatar.cc/150?u=vikram',
    rating: 4.7,
    reviews: 156,
    experience: '8 years',
    price: 1800,
    specialization: ['Serve', 'Forehand', 'Backhand'],
    bio: 'ATP ranked player providing high-intensity tennis training.',
    certifications: ['ITF Level 1'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'tr5',
    name: 'Amit Kumar',
    sport: 'basketball',
    city: 'delhi',
    image: 'https://i.pravatar.cc/150?u=amit',
    rating: 4.6,
    reviews: 98,
    experience: '7 years',
    price: 1200,
    specialization: ['Shooting', 'Dribbling', 'Defense'],
    bio: 'Pro basketball player with experience in national tournaments.',
    certifications: ['Basketball Federation Certified'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Sat', 'Sun']
  },
  {
    id: 'tr6',
    name: 'Sneha Reddy',
    sport: 'swimming',
    city: 'hyderabad',
    image: 'https://i.pravatar.cc/150?u=sneha',
    rating: 4.9,
    reviews: 276,
    experience: '12 years',
    price: 1000,
    specialization: ['Freestyle', 'Backstroke', 'Butterfly'],
    bio: 'Asian Games medalist. Teaches all age groups.',
    certifications: ['Level 3 Swimming Coach', 'Lifeguard Certified'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: 'tr7',
    name: 'Arjun Nair',
    sport: 'hockey',
    city: 'kolkata',
    image: 'https://i.pravatar.cc/150?u=arjun',
    rating: 4.7,
    reviews: 145,
    experience: '9 years',
    price: 1600,
    specialization: ['Drag Flicks', 'Penalty Corners', 'Defending'],
    bio: 'Indian hockey team former member with international experience.',
    certifications: ['Level 2 Hockey Coach'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']
  },
  {
    id: 'tr8',
    name: 'Kiran Joshi',
    sport: 'tennis',
    city: 'pune',
    image: 'https://i.pravatar.cc/150?u=kiran',
    rating: 4.8,
    reviews: 203,
    experience: '11 years',
    price: 1700,
    specialization: ['Serve', 'Volley', 'Match Strategy'],
    bio: 'Former Wimbledon qualifier. Specializes in advanced training.',
    certifications: ['USPTR Certified'],
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'tr9',
    name: 'Rohit Mehra',
    sport: 'cricket',
    city: 'bangalore',
    image: 'https://i.pravatar.cc/150?u=rohit',
    rating: 4.8,
    reviews: 167,
    experience: '8 years',
    price: 2200,
    specialization: ['Batting', 'Captaincy', 'Mental Training'],
    bio: 'IPL veteran with expertise in T20 cricket training.',
    certifications: ['BCCI Level 1'],
    availableDays: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: 'tr10',
    name: 'Maria Garcia',
    sport: 'football',
    city: 'chennai',
    image: 'https://i.pravatar.cc/150?u=maria',
    rating: 4.9,
    reviews: 289,
    experience: '14 years',
    price: 2300,
    specialization: ['Goalkeeping', 'Defense', 'Team Tactics'],
    bio: 'Former national team captain. Expert in all aspects of football.',
    certifications: ['UEFA B License', 'AFC B License'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat']
  }
];

let currentTrainerFilter = 'all';
let currentCityFilter = 'all';
let selectedTrainer = null;

function initTrainerLogic() {
  renderTrainers();
  setupFilters();
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('booking-date').min = today;
}

function renderTrainers() {
  const container = document.getElementById('trainers-grid');
  let filteredTrainers = trainersData;
  
  if (currentTrainerFilter !== 'all') filteredTrainers = filteredTrainers.filter(t => t.sport === currentTrainerFilter);
  if (currentCityFilter !== 'all') filteredTrainers = filteredTrainers.filter(t => t.city === currentCityFilter);
  
  if (filteredTrainers.length === 0) {
    container.innerHTML = `<div class="glass-card text-center" style="padding: 3rem;"><i class="ph-duotone ph-user-circle-gear text-6xl text-muted mb-4"></i><h3 class="text-xl mb-2">No trainers found</h3><p class="text-muted">Try selecting a different city or sport</p></div>`;
    return;
  }
  
  container.innerHTML = filteredTrainers.map(trainer => `
    <div class="glass-card" style="padding: 1.5rem;">
      <div class="flex gap-4" style="flex-wrap: wrap;">
        <div style="position: relative;">
          <img src="${trainer.image}" alt="${trainer.name}" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--primary);">
          <span class="badge badge-primary" style="position: absolute; bottom: 0; right: 0;"><i class="ph-fill ph-star text-warning"></i> ${trainer.rating}</span>
        </div>
        
        <div style="flex: 1; min-width: 250px;">
          <div class="flex justify-between align-center mb-2">
            <h3 class="text-xl font-heading">${trainer.name}</h3>
            <span class="text-xl font-heading text-primary">₹${trainer.price}<span class="text-sm text-muted">/hr</span></span>
          </div>
          
          <p class="text-sm text-primary mb-2">${getSportIcon(trainer.sport)} ${trainer.sport.charAt(0).toUpperCase() + trainer.sport.slice(1)} • ${trainer.city.charAt(0).toUpperCase() + trainer.city.slice(1)}</p>
          
          <p class="text-sm text-muted mb-3">${trainer.bio}</p>
          
          <div class="flex gap-2 mb-3" style="flex-wrap: wrap;">
            ${trainer.specialization.map(spec => `<span class="badge" style="background: var(--bg-card-hover);">${spec}</span>`).join('')}
          </div>
          
          <div class="flex gap-4 mb-4 text-sm">
            <span class="text-muted"><i class="ph-bold ph-briefcase"></i> ${trainer.experience}</span>
            <span class="text-muted"><i class="ph-bold ph-chat-circle-dots"></i> ${trainer.reviews} reviews</span>
            <span class="text-muted"><i class="ph-bold ph-calendar"></i> ${trainer.availableDays.join(', ')}</span>
          </div>
          
          <div class="flex gap-2">
            <button class="btn btn-primary" onclick="bookTrainer('${trainer.id}')"><i class="ph-bold ph-calendar-plus"></i> Book Session</button>
            <button class="btn btn-outline"><i class="ph-bold ph-chat-teardrop"></i> Message</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function getSportIcon(sport) {
  const icons = { football: '⚽', cricket: '🏏', tennis: '🎾', basketball: '🏀', badminton: '🏸', hockey: '🏑', swimming: '🏊' };
  return icons[sport] || '🏃';
}

function setupFilters() {
  document.getElementById('trainer-city').addEventListener('change', (e) => { currentCityFilter = e.target.value; renderTrainers(); });
  
  document.querySelectorAll('.trainer-sport-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.trainer-sport-btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
      btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
      currentTrainerFilter = btn.getAttribute('data-sport');
      renderTrainers();
    });
  });
}

window.bookTrainer = function(trainerId) {
  selectedTrainer = trainersData.find(t => t.id === trainerId);
  if (!selectedTrainer) return;
  
  const detailsContainer = document.getElementById('trainer-details');
  detailsContainer.innerHTML = `
    <div class="flex gap-4 mb-4" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 12px;">
      <img src="${selectedTrainer.image}" alt="${selectedTrainer.name}" style="width: 70px; height: 70px; border-radius: 50%;">
      <div>
        <h4 class="font-heading mb-1">${selectedTrainer.name}</h4>
        <p class="text-sm text-muted">${selectedTrainer.sport.charAt(0).toUpperCase() + selectedTrainer.sport.slice(1)} Trainer</p>
        <p class="text-sm text-primary"><i class="ph-fill ph-star text-warning"></i> ${selectedTrainer.rating} (${selectedTrainer.reviews} reviews)</p>
      </div>
    </div>
    <div class="flex justify-between" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
      <span class="text-muted">Experience</span>
      <span class="font-medium">${selectedTrainer.experience}</span>
    </div>
    <div class="flex justify-between" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
      <span class="text-muted">Price per hour</span>
      <span class="font-medium text-primary">₹${selectedTrainer.price}</span>
    </div>
  `;
  
  document.getElementById('trainer-modal').style.display = 'flex';
};

window.closeTrainerModal = function() {
  document.getElementById('trainer-modal').style.display = 'none';
  selectedTrainer = null;
};

// Form submission
document.addEventListener('submit', function(e) {
  if (e.target.id === 'booking-form') {
    e.preventDefault();
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const sessionType = document.getElementById('session-type').value;
    
    if (!selectedTrainer || !date || !time) {
      window.notify('Please fill all details', 'error');
      return;
    }
    
    window.notify(`Training session booked with ${selectedTrainer.name}!`, 'success');
    closeTrainerModal();
  }
});
