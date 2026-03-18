export function TutorialsPage() {
  setTimeout(initTutorialsLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Learn <span class="text-gradient">Outdoor Games</span></h1>
        <p class="text-muted">Watch tutorials and learn how to play various outdoor sports</p>
      </div>
      
      <!-- Sport Categories -->
      <div class="flex gap-3 mb-8" style="flex-wrap: wrap;">
        <button class="tutorial-filter-btn btn btn-primary btn-sm" data-sport="all">All</button>
        <button class="tutorial-filter-btn btn btn-outline btn-sm" data-sport="football">⚽ Football</button>
        <button class="tutorial-filter-btn btn btn-outline btn-sm" data-sport="cricket">🏏 Cricket</button>
        <button class="tutorial-filter-btn btn btn-outline btn-sm" data-sport="tennis">🎾 Tennis</button>
        <button class="tutorial-filter-btn btn btn-outline btn-sm" data-sport="basketball">🏀 Basketball</button>
        <button class="tutorial-filter-btn btn btn-outline btn-sm" data-sport="badminton">🏸 Badminton</button>
        <button class="tutorial-filter-btn btn btn-outline btn-sm" data-sport="hockey">🏑 Hockey</button>
      </div>
      
      <!-- Featured Video -->
      <div class="glass-card mb-8" style="padding: 0; overflow: hidden;">
        <div style="position: relative; aspect-ratio: 16/9; max-height: 450px;">
          <video id="featured-video" controls style="width: 100%; height: 100%; object-fit: cover; background: #000;">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div style="padding: 1.5rem;">
          <span class="badge badge-primary mb-2" id="featured-category">Football</span>
          <h3 class="text-2xl font-heading mb-2" id="featured-title">Football Basics: Getting Started</h3>
          <p class="text-muted mb-4">Learn the fundamental skills of football including dribbling, passing, and shooting techniques.</p>
          <div class="flex align-center gap-4">
            <span class="text-sm text-muted"><i class="ph-bold ph-eye"></i> 12,450 views</span>
            <span class="text-sm text-muted"><i class="ph-bold ph-clock"></i> 15:30</span>
            <span class="text-sm text-primary"><i class="ph-bold ph-star"></i> 4.8</span>
          </div>
        </div>
      </div>
      
      <!-- Tutorial Grid -->
      <h2 class="text-2xl font-heading mb-6">More Tutorials</h2>
      <div id="tutorials-grid" class="flex flex-column gap-4">
        <!-- Tutorials will be rendered here -->
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

// Tutorial data
const tutorialsData = [
  {
    id: 't1',
    sport: 'football',
    title: 'Football Basics: Getting Started',
    description: 'Learn the fundamental skills of football including dribbling, passing, and shooting techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '15:30',
    views: 12450,
    rating: 4.8,
    category: 'Beginner'
  },
  {
    id: 't2',
    sport: 'football',
    title: 'Advanced Football Tactics',
    description: 'Master advanced tactics including formation, positioning, and team coordination.',
    thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '22:15',
    views: 8230,
    rating: 4.9,
    category: 'Advanced'
  },
  {
    id: 't3',
    sport: 'cricket',
    title: 'Cricket Batting Fundamentals',
    description: 'Learn proper grip, stance, and batting techniques for cricket.',
    thumbnail: 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '18:45',
    views: 15670,
    rating: 4.7,
    category: 'Beginner'
  },
  {
    id: 't4',
    sport: 'cricket',
    title: 'Cricket Bowling Techniques',
    description: 'Master different bowling styles including pace, spin, and swing bowling.',
    thumbnail: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '20:00',
    views: 9870,
    rating: 4.6,
    category: 'Intermediate'
  },
  {
    id: 't5',
    sport: 'tennis',
    title: 'Tennis Serve Tutorial',
    description: 'Learn the proper technique for serving in tennis.',
    thumbnail: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '12:30',
    views: 7650,
    rating: 4.8,
    category: 'Beginner'
  },
  {
    id: 't6',
    sport: 'tennis',
    title: 'Tennis Backhand Mastery',
    description: 'Improve your backhand with these professional tips.',
    thumbnail: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '14:20',
    views: 5430,
    rating: 4.5,
    category: 'Intermediate'
  },
  {
    id: 't7',
    sport: 'basketball',
    title: 'Basketball Dribbling Skills',
    description: 'Master dribbling techniques for basketball.',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '16:00',
    views: 11230,
    rating: 4.7,
    category: 'Beginner'
  },
  {
    id: 't8',
    sport: 'basketball',
    title: 'Basketball Shooting Techniques',
    description: 'Learn proper shooting form and accuracy tips.',
    thumbnail: 'https://images.unsplash.com/photo-1519861531473-920026393131?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '19:15',
    views: 8920,
    rating: 4.6,
    category: 'Intermediate'
  },
  {
    id: 't9',
    sport: 'badminton',
    title: 'Badminton Smash Techniques',
    description: 'Master the badminton smash for powerful attacks.',
    thumbnail: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '11:45',
    views: 6540,
    rating: 4.8,
    category: 'Intermediate'
  },
  {
    id: 't10',
    sport: 'hockey',
    title: 'Field Hockey Basics',
    description: 'Learn the fundamentals of field hockey.',
    thumbnail: 'https://images.unsplash.com/photo-1519861531473-920026393131?w=400&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '17:30',
    views: 4320,
    rating: 4.5,
    category: 'Beginner'
  }
];

let currentSportFilter = 'all';

function initTutorialsLogic() {
  renderTutorials();
  setupFilterListeners();
}

function renderTutorials() {
  const container = document.getElementById('tutorials-grid');
  const filteredTutorials = currentSportFilter === 'all' ? tutorialsData : tutorialsData.filter(t => t.sport === currentSportFilter);
  
  container.innerHTML = filteredTutorials.map(tutorial => `
    <div class="glass-card flex gap-4" style="padding: 1rem; cursor: pointer;" onclick="playVideo('${tutorial.id}')">
      <div style="position: relative; width: 200px; min-width: 200px;">
        <img src="${tutorial.thumbnail}" alt="${tutorial.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;">
        <span class="badge" style="position: absolute; bottom: 0.5rem; right: 0.5rem; background: rgba(0,0,0,0.8);">${tutorial.duration}</span>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <i class="ph-bold ph-play text-primary"></i>
        </div>
      </div>
      <div style="flex: 1;">
        <span class="badge badge-primary mb-2">${tutorial.category}</span>
        <h4 class="font-heading mb-2">${tutorial.title}</h4>
        <p class="text-sm text-muted mb-2">${tutorial.description}</p>
        <div class="flex align-center gap-4">
          <span class="text-xs text-muted"><i class="ph-bold ph-eye"></i> ${tutorial.views.toLocaleString()} views</span>
          <span class="text-xs text-primary"><i class="ph-bold ph-star"></i> ${tutorial.rating}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFilterListeners() {
  document.querySelectorAll('.tutorial-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tutorial-filter-btn').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-outline'); });
      btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
      currentSportFilter = btn.getAttribute('data-sport');
      renderTutorials();
    });
  });
}

window.playVideo = function(tutorialId) {
  const tutorial = tutorialsData.find(t => t.id === tutorialId);
  if (!tutorial) return;
  
  // Update featured video
  document.getElementById('featured-title').textContent = tutorial.title;
  document.getElementById('featured-category').textContent = tutorial.category;
  
  // Also open modal
  document.getElementById('modal-title').textContent = tutorial.title;
  document.getElementById('modal-description').textContent = tutorial.description;
  document.getElementById('modal-video').src = tutorial.videoUrl;
  document.getElementById('video-modal').style.display = 'flex';
};

window.closeVideoModal = function() {
  document.getElementById('video-modal').style.display = 'none';
  document.getElementById('modal-video').pause();
};
