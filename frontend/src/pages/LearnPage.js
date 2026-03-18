export function LearnPage() {
  setTimeout(initLearnLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Learn & Train</h1>
        <p class="text-muted">Find professional trainers and watch video tutorials to improve your skills</p>
      </div>
      
      <!-- Tab Navigation -->
      <div class="flex gap-2 mb-6" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem;">
        <button class="learn-tab-btn btn btn-primary btn-sm" data-tab="trainers">
          <i class="ph-bold chalkboard-teacher"></i> Find Trainers
        </button>
        <button class="learn-tab-btn btn btn-outline btn-sm" data-tab="videos">
          <i class="ph-bold ph-video-camera"></i> Video Tutorials
        </button>
      </div>
      
      <!-- Trainers Section -->
      <div id="section-trainers" class="learn-section">
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
              </div>
            </div>
          </div>
        </div>
        
        <!-- Trainers Grid -->
        <div id="trainers-grid" class="flex flex-column gap-4"></div>
      </div>
      
      <!-- Videos Section -->
      <div id="section-videos" class="learn-section" style="display: none;">
        <!-- Sport Filter -->
        <div class="flex gap-3 mb-6" style="flex-wrap: wrap;">
          <button class="video-filter-btn btn btn-primary btn-sm" data-sport="all">All</button>
          <button class="video-filter-btn btn btn-outline btn-sm" data-sport="football">⚽ Football</button>
          <button class="video-filter-btn btn btn-outline btn-sm" data-sport="cricket">🏏 Cricket</button>
          <button class="video-filter-btn btn btn-outline btn-sm" data-sport="tennis">🎾 Tennis</button>
          <button class="video-filter-btn btn btn-outline btn-sm" data-sport="basketball">🏀 Basketball</button>
        </div>
        
        <!-- Featured Video -->
        <div class="glass-card mb-6" style="padding: 0; overflow: hidden;">
          <div style="position: relative; aspect-ratio: 16/9; max-height: 400px;">
            <video id="featured-video" controls style="width: 100%; height: 100%; object-fit: cover; background: #000;">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            </video>
          </div>
          <div style="padding: 1.5rem;">
            <span class="badge badge-primary mb-2" id="featured-category">Football</span>
            <h3 class="text-2xl font-heading mb-2" id="featured-title">Football Basics: Getting Started</h3>
            <p class="text-muted">Learn the fundamental skills of football including dribbling, passing, and shooting techniques.</p>
          </div>
        </div>
        
        <!-- Videos Grid -->
        <div id="videos-grid" class="flex flex-column gap-4"></div>
      </div>
      
      <!-- Video Modal -->
      <div id="video-modal" class="modal-overlay" style="display: none;">
        <div class="glass-card modal-content" style="max-width: 800px; width: 100%; padding: 0;">
          <div style="position: relative; aspect-ratio: 16/9;">
            <video id="modal-video" controls style="width: 100%; height: 100%;">
              <source src="" type="video/mp4">
            </video>
            <button class="btn-ghost" onclick="closeVideoModal()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.7); border-radius: 50%; width: 40px; height: 40px;">
              <i class="ph-bold ph-x text-xl" style="color: white;"></i>
            </button>
          </div>
          <div style="padding: 1.5rem;">
            <h3 class="text-xl font-heading mb-2" id="modal-title">Video Title</h3>
            <p class="text-muted" id="modal-description">Video description</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Trainer data
const trainersData = [
  { id: 'tr1', name: 'Rahul Sharma', sport: 'cricket', city: 'mumbai', image: 'https://i.pravatar.cc/150?u=rahul', rating: 4.9, reviews: 234, experience: '15 years', price: 2500, specialization: ['Batting', 'Bowling', 'Fielding'] },
  { id: 'tr2', name: 'Carlos Silva', sport: 'football', city: 'bangalore', image: 'https://i.pravatar.cc/150?u=carlos', rating: 4.8, reviews: 189, experience: '12 years', price: 2000, specialization: ['Dribbling', 'Passing', 'Tactical Play'] },
  { id: 'tr3', name: 'Priya Patel', sport: 'badminton', city: 'delhi', image: 'https://i.pravatar.cc/150?u=priya', rating: 4.9, reviews: 312, experience: '10 years', price: 1500, specialization: ['Smash', 'Drop Shot', 'Net Play'] },
  { id: 'tr4', name: 'Vikram Singh', sport: 'tennis', city: 'mumbai', image: 'https://i.pravatar.cc/150?u=vikram', rating: 4.7, reviews: 156, experience: '8 years', price: 1800, specialization: ['Serve', 'Forehand', 'Backhand'] },
  { id: 'tr5', name: 'Amit Kumar', sport: 'basketball', city: 'delhi', image: 'https://i.pravatar.cc/150?u=amit', rating: 4.6, reviews: 98, experience: '7 years', price: 1200, specialization: ['Shooting', 'Dribbling', 'Defense'] },
  { id: 'tr6', name: 'Sneha Reddy', sport: 'swimming', city: 'hyderabad', image: 'https://i.pravatar.cc/150?u=sneha', rating: 4.9, reviews: 276, experience: '12 years', price: 1000, specialization: ['Freestyle', 'Backstroke', 'Butterfly'] },
];

// Video tutorials data
const videosData = [
  { id: 'v1', sport: 'football', title: 'Football Basics: Getting Started', description: 'Learn the fundamental skills of football.', thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '15:30', views: 12450, rating: 4.8 },
  { id: 'v2', sport: 'cricket', title: 'Cricket Batting Fundamentals', description: 'Learn proper grip, stance, and batting techniques.', thumbnail: 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=400&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '18:45', views: 15670, rating: 4.7 },
  { id: 'v3', sport: 'tennis', title: 'Tennis Serve Tutorial', description: 'Learn the proper technique for serving.', thumbnail: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=400&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '12:30', views: 7650, rating: 4.8 },
  { id: 'v4', sport: 'basketball', title: 'Basketball Dribbling Skills', description: 'Master dribbling techniques.', thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '16:00', views: 11230, rating: 4.7 },
  { id: 'v5', sport: 'badminton', title: 'Badminton Smash Techniques', description: 'Master the badminton smash.', thumbnail: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=400&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '11:45', views: 6540, rating: 4.8 },
  { id: 'v6', sport: 'football', title: 'Advanced Football Tactics', description: 'Master advanced tactics.', thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '22:15', views: 8230, rating: 4.9 },
];

let currentTrainerFilter = 'all';
let currentCityFilter = 'all';
let currentVideoFilter = 'all';

function initLearnLogic() {
  renderTrainers();
  renderVideos();
  setupLearnTabs();
  setupFilters();
}

function setupLearnTabs() {
  const tabBtns = document.querySelectorAll('.learn-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
      btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
      
      document.getElementById('section-trainers').style.display = tab === 'trainers' ? 'block' : 'none';
      document.getElementById('section-videos').style.display = tab === 'videos' ? 'block' : 'none';
    });
  });
}

function setupFilters() {
  // Trainer filters
  document.getElementById('trainer-city').addEventListener('change', (e) => { currentCityFilter = e.target.value; renderTrainers(); });
  document.querySelectorAll('.trainer-sport-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.trainer-sport-btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
      btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
      currentTrainerFilter = btn.getAttribute('data-sport');
      renderTrainers();
    });
  });
  
  // Video filters
  document.querySelectorAll('.video-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.video-filter-btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
      btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
      currentVideoFilter = btn.getAttribute('data-sport');
      renderVideos();
    });
  });
}

function renderTrainers() {
  const container = document.getElementById('trainers-grid');
  let filtered = trainersData;
  if (currentTrainerFilter !== 'all') filtered = filtered.filter(t => t.sport === currentTrainerFilter);
  if (currentCityFilter !== 'all') filtered = filtered.filter(t => t.city === currentCityFilter);
  
  if (filtered.length === 0) {
    container.innerHTML = `<div class="glass-card text-center" style="padding: 3rem;"><h3>No trainers found</h3></div>`;
    return;
  }
  
  container.innerHTML = filtered.map(trainer => `
    <div class="glass-card flex gap-4" style="padding: 1.5rem;">
      <div style="position: relative;">
        <img src="${trainer.image}" alt="${trainer.name}" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid var(--primary);">
        <span class="badge badge-primary" style="position: absolute; bottom: 0; right: 0;"><i class="ph-fill ph-star text-warning"></i> ${trainer.rating}</span>
      </div>
      <div style="flex: 1;">
        <div class="flex justify-between align-center mb-2">
          <h3 class="text-xl font-heading">${trainer.name}</h3>
          <span class="text-xl font-heading text-primary">₹${trainer.price}<span class="text-sm text-muted">/hr</span></span>
        </div>
        <p class="text-sm text-primary mb-2">${getSportIcon(trainer.sport)} ${trainer.sport.charAt(0).toUpperCase() + trainer.sport.slice(1)} • ${trainer.city.charAt(0).toUpperCase() + trainer.city.slice(1)}</p>
        <p class="text-sm text-muted mb-2">${trainer.experience} experience • ${trainer.reviews} reviews</p>
        <div class="flex gap-2 mb-3">${trainer.specialization.map(s => `<span class="badge" style="background: var(--bg-card-hover);">${s}</span>`).join('')}</div>
        <button class="btn btn-primary"><i class="ph-bold ph-calendar-plus"></i> Book Session</button>
      </div>
    </div>
  `).join('');
}

function renderVideos() {
  const container = document.getElementById('videos-grid');
  let filtered = videosData;
  if (currentVideoFilter !== 'all') filtered = filtered.filter(v => v.sport === currentVideoFilter);
  
  container.innerHTML = filtered.map(video => `
    <div class="glass-card flex gap-4" style="padding: 1rem; cursor: pointer;" onclick="playVideo('${video.id}')">
      <div style="position: relative; width: 180px; min-width: 180px;">
        <img src="${video.thumbnail}" alt="${video.title}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px;">
        <span class="badge" style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.8);">${video.duration}</span>
      </div>
      <div style="flex: 1;">
        <h4 class="font-heading mb-1">${video.title}</h4>
        <p class="text-sm text-muted mb-2">${video.description}</p>
        <div class="flex align-center gap-4">
          <span class="text-xs text-muted"><i class="ph-bold ph-eye"></i> ${video.views.toLocaleString()}</span>
          <span class="text-xs text-primary"><i class="ph-bold ph-star"></i> ${video.rating}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function getSportIcon(sport) {
  const icons = { football: '⚽', cricket: '🏏', tennis: '🎾', basketball: '🏀', badminton: '🏸', hockey: '🏑', swimming: '🏊' };
  return icons[sport] || '🏃';
}

window.playVideo = function(videoId) {
  const video = videosData.find(v => v.id === videoId);
  if (!video) return;
  document.getElementById('modal-title').textContent = video.title;
  document.getElementById('modal-description').textContent = video.description;
  document.getElementById('modal-video').src = video.videoUrl;
  document.getElementById('video-modal').style.display = 'flex';
};

window.closeVideoModal = function() {
  document.getElementById('video-modal').style.display = 'none';
  document.getElementById('modal-video').pause();
};
