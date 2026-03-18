export function MapPage() {
  setTimeout(initMapLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Find <span class="text-gradient">Nearby Grounds</span></h1>
        <p class="text-muted">Discover sports grounds near your location in India</p>
      </div>
      
      <div class="flex gap-6" style="flex-wrap: wrap;">
        <!-- Map Container -->
        <div class="glass-card" style="flex: 2; min-width: 400px; padding: 0; overflow: hidden;">
          <div id="map" style="width: 100%; height: 550px; background: var(--bg-card-hover);">
            <div class="flex align-center justify-center h-full">
              <div class="text-center"><i class="ph-duotone ph-map-trifold text-6xl text-muted mb-4"></i><p class="text-muted">Loading map...</p></div>
            </div>
          </div>
        </div>
        
        <!-- Grounds List -->
        <div class="glass-card" style="flex: 1; min-width: 320px; max-height: 580px; overflow-y: auto;">
          <h3 class="text-lg font-heading mb-4 flex align-center gap-2"><i class="ph-bold ph-list-dashes"></i> Nearby Grounds</h3>
          <div id="grounds-list" class="flex flex-column gap-3"></div>
        </div>
      </div>
      
      <!-- Ground Details Modal -->
      <div id="ground-modal" class="modal-overlay" style="display: none;">
        <div class="glass-card modal-content" style="max-width: 600px; padding: 0; max-height: 90vh; overflow-y: auto;">
          <div style="position: relative;">
            <img id="modal-ground-image" src="" alt="" style="width: 100%; height: 250px; object-fit: cover;">
            <button class="btn-ghost" onclick="closeGroundModal()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-x text-xl" style="color: white;"></i>
            </button>
            <div class="flex gap-2" id="modal-gallery" style="position: absolute; bottom: 1rem; right: 1rem;"></div>
          </div>
          <div style="padding: 1.5rem;">
            <div class="flex justify-between align-center mb-4">
              <h3 class="text-xl font-heading" id="modal-ground-name">Ground Name</h3>
              <span class="badge badge-primary" style="font-size: 1rem;"><i class="ph-fill ph-star text-warning"></i> <span id="modal-ground-rating">4.5</span></span>
            </div>
            
            <p class="text-muted mb-4 flex align-center gap-2"><i class="ph-bold ph-map-pin text-primary"></i> <span id="modal-ground-address">Address</span></p>
            
            <div class="mb-4">
              <h4 class="font-medium mb-2">Games Available</h4>
              <div class="flex gap-2" id="modal-games" style="flex-wrap: wrap;"></div>
            </div>
            
            <div class="mb-4">
              <h4 class="font-medium mb-2">Amenities</h4>
              <div class="flex gap-2" id="modal-amenities" style="flex-wrap: wrap;"></div>
            </div>
            
            <div class="flex gap-4 mb-6" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 12px;">
              <div><p class="text-sm text-muted">Price</p><p class="text-xl font-heading text-primary" id="modal-ground-price">₹500/hr</p></div>
              <div><p class="text-sm text-muted">Reviews</p><p class="text-xl font-heading" id="modal-ground-reviews">100</p></div>
            </div>
            
            <div class="flex gap-3">
              <button class="btn btn-outline flex-1" onclick="closeGroundModal()">Close</button>
              <a href="/slots" class="btn btn-primary flex-1 text-center" data-link><i class="ph-bold ph-calendar-plus"></i> Book Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// India grounds with coordinates
const mapGrounds = [
  { id: 'g1', name: 'Mumbai Football Arena', sport: 'Football', city: 'Mumbai', address: 'Marine Drive, Mumbai Central', lat: 18.9438, lng: 72.8234, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80'], rating: 4.8, reviews: 256, price: '₹1,500/hr', hours: '6:00 AM - 10:00 PM', amenities: ['Parking', 'Floodlights', 'Changing Rooms'], availableGames: ['Football', 'Futsal'] },
  { id: 'g2', name: 'Andheri Cricket Club', sport: 'Cricket', city: 'Mumbai', address: 'Andheri West, Mumbai', lat: 19.1363, lng: 72.8462, image: 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=400&q=80', 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=400&q=80'], rating: 4.6, reviews: 189, price: '₹2,500/hr', hours: '7:00 AM - 9:00 PM', amenities: ['Parking', 'Practice Nets', 'Pavilion'], availableGames: ['Cricket', 'Practice Nets'] },
  { id: 'g3', name: 'Delhi Sports Complex', sport: 'Tennis', city: 'Delhi', address: 'Nehru Place, New Delhi', lat: 28.5542, lng: 77.2833, image: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=400&q=80', 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=400&q=80'], rating: 4.9, reviews: 342, price: '₹800/hr', hours: '6:00 AM - 11:00 PM', amenities: ['AC Courts', 'Pro Shop', 'Coaching'], availableGames: ['Tennis', 'Pickleball'] },
  { id: 'g4', name: 'Dwarka Basketball Court', sport: 'Basketball', city: 'Delhi', address: 'Dwarka Sector 12, Delhi', lat: 28.5921, lng: 77.0495, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80', 'https://images.unsplash.com/photo-1519861531473-920026393131?w=400&q=80'], rating: 4.5, reviews: 127, price: '₹600/hr', hours: '8:00 AM - 10:00 PM', amenities: ['Indoor Court', 'Floodlights'], availableGames: ['Basketball', '3v3'] },
  { id: 'g5', name: 'Bangalore Badminton Hub', sport: 'Badminton', city: 'Bangalore', address: 'Whitefield, Bangalore', lat: 12.9698, lng: 77.7499, image: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=400&q=80', 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=400&q=80'], rating: 4.7, reviews: 412, price: '₹400/hr', hours: '6:00 AM - 11:00 PM', amenities: ['AC Courts', 'Shuttle Service'], availableGames: ['Badminton', 'Mixed Doubles'] },
  { id: 'g6', name: 'Chennai Hockey Academy', sport: 'Hockey', city: 'Chennai', address: 'Velachery, Chennai', lat: 12.9180, lng: 80.1015, image: 'https://images.unsplash.com/photo-1519861531473-920026393131?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1519861531473-920026393131?w=400&q=80', 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=400&q=80'], rating: 4.8, reviews: 76, price: '₹1,800/hr', hours: '5:00 AM - 9:00 PM', amenities: ['Astro Turf', 'Coaching'], availableGames: ['Hockey', 'Practice'] },
  { id: 'g7', name: 'Kolkata Cricket Ground', sport: 'Cricket', city: 'Kolkata', address: 'Eden Gardens, Kolkata', lat: 22.5646, lng: 88.3428, image: 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=400&q=80', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80'], rating: 4.9, reviews: 523, price: '₹3,000/hr', hours: '6:00 AM - 10:00 PM', amenities: ['Premium Pitch', 'VIP Lounge'], availableGames: ['Cricket', 'T20 Matches'] },
  { id: 'g8', name: 'Gachibowli Sports Arena', sport: 'Football', city: 'Hyderabad', lat: 17.4401, lng: 78.3408, address: 'Gachibowli, Hyderabad', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&q=80', 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80'], rating: 4.6, reviews: 167, price: '₹1,400/hr', hours: '5:00 AM - 11:00 PM', amenities: ['Astro Turf', 'Parking'], availableGames: ['Football', '5-a-side'] },
  { id: 'g9', name: 'Pune Swimming Academy', sport: 'Swimming', city: 'Pune', address: 'Koregaon Park, Pune', lat: 18.5362, lng: 73.8952, image: 'https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=600&q=80', gallery: ['https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=400&q=80', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80'], rating: 4.8, reviews: 289, price: '₹350/hr', hours: '5:00 AM - 9:00 PM', amenities: ['Olympic Pool', 'Life Guard'], availableGames: ['Swimming', 'Aqua Aerobics'] }
];

let map = null;
let userMarker = null;
let groundMarkers = [];

function initMapLogic() { loadLeafletLibs().then(() => { initializeMap(); }); }

function loadLeafletLibs() {
  return new Promise((resolve) => {
    if (window.L) { resolve(); return; }
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
    const script = document.createElement('script'); script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.onload = resolve; document.head.appendChild(script);
  });
}

function initializeMap() {
  const defaultLat = 19.0760; const defaultLng = 72.8777; // Mumbai as default
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => { createMap(position.coords.latitude, position.coords.longitude, true); }, () => { createMap(defaultLat, defaultLng, false); });
  } else { createMap(defaultLat, defaultLng, false); }
}

function createMap(lat, lng, hasUserLocation) {
  const mapContainer = document.getElementById('map'); mapContainer.innerHTML = '';
  map = window.L.map('map').setView([lat, lng], 11);
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);
  
  if (hasUserLocation) {
    const userIcon = window.L.divIcon({ className: 'user-marker', html: '<div style="width: 20px; height: 20px; background: #6366f1; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>', iconSize: [20, 20], iconAnchor: [10, 10] });
    userMarker = window.L.marker([lat, lng], { icon: userIcon }).addTo(map); userMarker.bindPopup('<b>Your Location</b>');
  }
  
  mapGrounds.forEach(ground => {
    const distance = calculateDistance(lat, lng, ground.lat, ground.lng);
    const groundIcon = window.L.divIcon({ className: 'ground-marker', html: `<div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 18px;">${getSportEmoji(ground.sport)}</div>`, iconSize: [40, 40], iconAnchor: [20, 20] });
    const marker = window.L.marker([ground.lat, ground.lng], { icon: groundIcon }).addTo(map);
    marker.bindPopup(`<div style="min-width: 150px;"><h4 style="margin: 0 0 8px 0; font-size: 14px;">${ground.name}</h4><p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${ground.sport}</p><p style="margin: 0; font-size: 12px; color: #10b981; font-weight: 600;">${distance.toFixed(1)} km away</p></div>`);
    marker.on('click', () => { showGroundDetails(ground); });
    groundMarkers.push({ marker, ground, distance });
  });
  
  renderGroundsList(lat, lng);
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; const dLat = (lat2 - lat1) * Math.PI / 180; const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); return R * c;
}

function getSportEmoji(sport) {
  const emojis = { 'Football': '⚽', 'Tennis': '🎾', 'Basketball': '🏀', 'Cricket': '🏏', 'Badminton': '🏸', 'Hockey': '🏑', 'Swimming': '🏊' };
  return emojis[sport] || '📍';
}

function renderGroundsList(userLat, userLng) {
  const listContainer = document.getElementById('grounds-list');
  const sortedGrounds = [...groundMarkers].sort((a, b) => a.distance - b.distance);
  
  listContainer.innerHTML = sortedGrounds.map(item => `
    <div class="ground-list-item" data-ground-id="${item.ground.id}" style="padding: 1rem; background: var(--bg-card-hover); border-radius: 12px; cursor: pointer; transition: all 0.2s;">
      <div class="flex gap-3">
        <img src="${item.ground.image}" alt="${item.ground.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
        <div style="flex: 1;">
          <h4 class="font-medium text-sm mb-1">${item.ground.name}</h4>
          <p class="text-xs text-muted mb-2">${item.ground.sport} • ${item.ground.city}</p>
          <div class="flex align-center justify-between">
            <span class="text-xs text-primary flex align-center gap-1"><i class="ph-fill ph-star text-warning"></i> ${item.ground.rating}</span>
            <span class="text-xs text-primary flex align-center gap-1"><i class="ph-bold ph-map-pin"></i> ${item.distance.toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.ground-list-item').forEach(item => {
    item.addEventListener('click', () => {
      const ground = mapGrounds.find(g => g.id === item.getAttribute('data-ground-id'));
      if (ground) { showGroundDetails(ground); map.setView([ground.lat, ground.lng], 15); }
    });
  });
}

function showGroundDetails(ground) {
  document.getElementById('modal-ground-name').textContent = ground.name;
  document.getElementById('modal-ground-address').textContent = ground.address;
  document.getElementById('modal-ground-rating').textContent = ground.rating;
  document.getElementById('modal-ground-reviews').textContent = ground.reviews;
  document.getElementById('modal-ground-price').textContent = ground.price;
  document.getElementById('modal-ground-image').src = ground.image;
  
  document.getElementById('modal-gallery').innerHTML = ground.gallery.map(img => `<img src="${img}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 2px solid white; cursor: pointer;" onclick="document.getElementById('modal-ground-image').src='${img}'">`).join('');
  
  document.getElementById('modal-games').innerHTML = ground.availableGames.map(game => `<span class="badge badge-primary">${game}</span>`).join('');
  document.getElementById('modal-amenities').innerHTML = ground.amenities.map(amenity => `<span class="badge" style="background: var(--bg-card-hover);">${amenity}</span>`).join('');
  
  document.getElementById('ground-modal').style.display = 'flex';
}

window.closeGroundModal = function() { document.getElementById('ground-modal').style.display = 'none'; };
