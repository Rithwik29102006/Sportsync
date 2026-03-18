export function FriendsPage() {
  setTimeout(initFriendsLogic, 0);
  
  return `
    <div class="container page-transition" style="padding-top: 2rem;">
      <div class="mb-8">
        <h1 class="text-4xl font-heading mb-2">Find <span class="text-gradient">Playing Partners</span></h1>
        <p class="text-muted">Connect with players near you who want to play</p>
      </div>
      
      <!-- Tab Navigation -->
      <div class="flex gap-2 mb-6" style="border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem;">
        <button class="tab-btn btn btn-primary btn-sm" data-tab="players">
          <i class="ph-bold ph-users"></i> Find Players
        </button>
        <button class="tab-btn btn btn-outline btn-sm" data-tab="teams">
          <i class="ph-bold ph-user-circle-gear"></i> Teams
        </button>
        <button class="tab-btn btn btn-outline btn-sm" data-tab="notifications">
          <i class="ph-bold ph-bell"></i> Notifications
          <span id="notif-badge" class="badge badge-primary" style="margin-left: 0.5rem; display: none;">0</span>
        </button>
      </div>
      
      <!-- Players Tab -->
      <div id="tab-players" class="tab-content">
        <!-- Filter Section -->
        <div class="glass-card mb-6" style="padding: 1.5rem;">
          <div class="flex gap-4 align-center" style="flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
              <input type="text" id="search-input" class="input-field" placeholder="Search players...">
            </div>
            
            <select id="sport-filter" class="input-field" style="width: auto; min-width: 150px;">
              <option value="all">All Sports</option>
              <option value="football">⚽ Football</option>
              <option value="tennis">🎾 Tennis</option>
              <option value="basketball">🏀 Basketball</option>
              <option value="cricket">🏏 Cricket</option>
            </select>
            
            <select id="distance-filter" class="input-field" style="width: auto; min-width: 150px;">
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="25">Within 25 km</option>
              <option value="all">Any distance</option>
            </select>
            
            <select id="availability-filter" class="input-field" style="width: auto; min-width: 150px;">
              <option value="all">Any time</option>
              <option value="now">Available Now</option>
              <option value="today">Today</option>
              <option value="weekend">This Weekend</option>
            </select>
          </div>
        </div>
        
        <!-- Players Grid -->
        <div id="friends-grid" class="flex flex-column gap-4">
          <!-- Loading state -->
          <div class="flex justify-center" style="padding: 3rem;">
            <i class="ph-bold ph-spinner animate-spin text-primary text-4xl"></i>
          </div>
        </div>
      </div>
      
      <!-- Teams Tab -->
      <div id="tab-teams" class="tab-content" style="display: none;">
        <div class="flex justify-between align-center mb-6">
          <h2 class="text-2xl font-heading">My Teams</h2>
          <button class="btn btn-primary btn-sm" onclick="createTeam()">
            <i class="ph-bold ph-plus"></i> Create Team
          </button>
        </div>
        
        <div id="teams-grid" class="flex flex-column gap-4">
          <!-- Teams will be rendered here -->
        </div>
        
        <!-- Available Players for Team -->
        <div class="mt-8">
          <h3 class="text-xl font-heading mb-4">Players Available to Join</h3>
          <div id="available-players-grid" class="flex flex-column gap-3">
            <!-- Available players will be rendered here -->
          </div>
        </div>
      </div>
      
      <!-- Notifications Tab -->
      <div id="tab-notifications" class="tab-content" style="display: none;">
        <div class="flex justify-between align-center mb-6">
          <h2 class="text-2xl font-heading">Notifications</h2>
          <button class="btn btn-outline btn-sm" onclick="clearNotifications()">
            <i class="ph-bold ph-trash"></i> Clear All
          </button>
        </div>
        
        <div id="notifications-list" class="flex flex-column gap-3">
          <!-- Notifications will be rendered here -->
        </div>
      </div>
      
      <!-- Chat Modal -->
      <div id="chat-modal" class="modal-overlay" style="display: none;">
        <div class="glass-card modal-content" style="max-width: 500px; width: 100%; padding: 0; max-height: 80vh; display: flex; flex-direction: column;">
          <div class="flex justify-between align-center" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
            <div class="flex align-center gap-3">
              <img id="chat-avatar" src="" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
              <div>
                <h3 class="font-medium" id="chat-name">Player Name</h3>
                <span class="text-xs text-muted" id="chat-status">Online</span>
              </div>
            </div>
            <button class="btn-ghost" onclick="closeChatModal()">
              <i class="ph-bold ph-x text-xl"></i>
            </button>
          </div>
          
          <div id="chat-messages" style="flex: 1; padding: 1rem; overflow-y: auto; min-height: 300px; max-height: 400px; display: flex; flex-direction: column; gap: 0.75rem;">
            <!-- Messages will be rendered here -->
          </div>
          
          <div style="padding: 1rem; border-top: 1px solid var(--glass-border);">
            <form id="chat-form" class="flex gap-2">
              <input type="text" id="chat-input" class="input-field" placeholder="Type a message...">
              <button type="submit" class="btn btn-primary">
                <i class="ph-bold ph-paper-plane-right"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <!-- Create Team Modal -->
      <div id="team-modal" class="modal-overlay" style="display: none;">
        <div class="glass-card modal-content" style="max-width: 500px; width: 100%; padding: 2rem;">
          <div class="flex justify-between align-center mb-6">
            <h3 class="text-xl font-heading">Create a Team</h3>
            <button class="btn-ghost" onclick="closeTeamModal()">
              <i class="ph-bold ph-x text-xl"></i>
            </button>
          </div>
          
          <form id="team-form" class="flex flex-column gap-4">
            <div>
              <label class="text-sm font-medium mb-2" style="display: block;">Team Name</label>
              <input type="text" id="team-name" class="input-field" placeholder="Enter team name" required>
            </div>
            
            <div>
              <label class="text-sm font-medium mb-2" style="display: block;">Sport</label>
              <select id="team-sport" class="input-field" required>
                <option value="">Select Sport</option>
                <option value="football">⚽ Football</option>
                <option value="tennis">🎾 Tennis</option>
                <option value="basketball">🏀 Basketball</option>
                <option value="cricket">🏏 Cricket</option>
              </select>
            </div>
            
            <div>
              <label class="text-sm font-medium mb-2" style="display: block;">Max Players</label>
              <select id="team-size" class="input-field">
                <option value="2">2 Players</option>
                <option value="3">3 Players</option>
                <option value="5">5 Players</option>
                <option value="7">7 Players</option>
                <option value="11">11 Players</option>
              </select>
            </div>
            
            <div>
              <label class="text-sm font-medium mb-2" style="display: block;">When to Play</label>
              <select id="team-availability" class="input-field">
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="weekend">This Weekend</option>
              </select>
            </div>
            
            <button type="submit" class="btn btn-primary w-full">
              <i class="ph-bold ph-plus"></i> Create Team
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

// Mock data for nearby players
const playersData = [
  {
    id: 'p1',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/150?u=mike',
    sport: 'football',
    skillLevel: 'Intermediate',
    availability: 'today',
    availableTime: '4:00 PM',
    distance: 1.2,
    location: { lat: 40.7150, lng: -74.0080 },
    online: true,
    bio: 'Love playing football on weekends. Looking for regular partners!',
    teamId: null
  },
  {
    id: 'p2',
    name: 'Sarah Williams',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    sport: 'tennis',
    skillLevel: 'Advanced',
    availability: 'now',
    availableTime: 'Now',
    distance: 2.5,
    location: { lat: 40.7200, lng: -74.0100 },
    online: true,
    bio: 'Tennis pro looking for challenging matches. Available evenings.',
    teamId: null
  },
  {
    id: 'p3',
    name: 'David Chen',
    avatar: 'https://i.pravatar.cc/150?u=david',
    sport: 'basketball',
    skillLevel: 'Intermediate',
    availability: 'weekend',
    availableTime: 'Saturday 10 AM',
    distance: 3.1,
    location: { lat: 40.7250, lng: -74.0200 },
    online: true,
    bio: '3v3 basketball enthusiast. Love competitive games!',
    teamId: 't1'
  },
  {
    id: 'p4',
    name: 'Emma Davis',
    avatar: 'https://i.pravatar.cc/150?u=emma',
    sport: 'football',
    skillLevel: 'Beginner',
    availability: 'today',
    availableTime: '6:00 PM',
    distance: 4.2,
    location: { lat: 40.7300, lng: -73.9900 },
    online: false,
    bio: 'New to football, looking to learn and practice with friendly players.',
    teamId: null
  },
  {
    id: 'p5',
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?u=james',
    sport: 'cricket',
    skillLevel: 'Advanced',
    availability: 'weekend',
    availableTime: 'Sunday 9 AM',
    distance: 5.8,
    location: { lat: 40.7100, lng: -73.9800 },
    online: true,
    bio: 'All-rounder. Looking for weekend cricket matches.',
    teamId: null
  },
  {
    id: 'p6',
    name: 'Lisa Anderson',
    avatar: 'https://i.pravatar.cc/150?u=lisa',
    sport: 'tennis',
    skillLevel: 'Intermediate',
    availability: 'now',
    availableTime: 'Now',
    distance: 6.3,
    location: { lat: 40.7050, lng: -74.0250 },
    online: true,
    bio: 'Tennis doubles partner needed. Can play both weekdays and weekends.',
    teamId: null
  },
  {
    id: 'p7',
    name: 'Tom Martinez',
    avatar: 'https://i.pravatar.cc/150?u=tom',
    sport: 'basketball',
    skillLevel: 'Advanced',
    availability: 'today',
    availableTime: '5:30 PM',
    distance: 7.5,
    location: { lat: 40.7350, lng: -74.0150 },
    online: false,
    bio: 'Point guard looking for competitive 5v5 games.',
    teamId: 't1'
  },
  {
    id: 'p8',
    name: 'Amy Taylor',
    avatar: 'https://i.pravatar.cc/150?u=amy',
    sport: 'cricket',
    skillLevel: 'Intermediate',
    availability: 'weekend',
    availableTime: 'Saturday 2 PM',
    distance: 8.2,
    location: { lat: 40.7000, lng: -73.9700 },
    online: true,
    bio: 'Batsman looking for weekend cricket games at local grounds.',
    teamId: null
  }
];

// Mock teams data
const teamsData = [
  {
    id: 't1',
    name: 'Street Kings',
    sport: 'basketball',
    maxPlayers: 5,
    currentPlayers: 3,
    leader: 'p3',
    members: ['p3', 'p7'],
    availability: 'weekend',
    time: 'Saturday 10 AM',
    lookingFor: 2
  }
];

// Mock notifications
let notificationsData = [
  { id: 'n1', type: 'admin', title: 'New Tournament', message: 'Join the City Football Cup this weekend!', time: '2 hours ago', read: false },
  { id: 'n2', type: 'invite', title: 'Team Invitation', message: 'David Chen invited you to join Street Kings', time: '5 hours ago', read: false },
  { id: 'n3', type: 'system', title: 'Booking Confirmed', message: 'Your slot at Downtown Arena is confirmed for tomorrow', time: '1 day ago', read: true }
];

// Chat messages storage
const chatMessages = {};

let filteredPlayers = [...playersData];
let currentTab = 'players';
let currentChatPlayer = null;

function initFriendsLogic() {
  renderPlayers();
  renderTeams();
  renderNotifications();
  setupFilters();
  setupTabs();
  updateNotifBadge();
}

function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      
      // Update button styles
      tabBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');
      
      // Show/hide content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });
      document.getElementById(`tab-${tab}`).style.display = 'block';
      
      currentTab = tab;
    });
  });
}

function renderPlayers() {
  const container = document.getElementById('friends-grid');
  
  if (filteredPlayers.length === 0) {
    container.innerHTML = `
      <div class="glass-card text-center" style="padding: 3rem;">
        <i class="ph-duotone ph-users text-6xl text-muted mb-4"></i>
        <h3 class="text-xl mb-2">No players found</h3>
        <p class="text-muted">Try adjusting your filters to find more players</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filteredPlayers.map(player => `
    <div class="glass-card" style="padding: 1.5rem;">
      <div class="flex gap-4" style="flex-wrap: wrap;">
        <div style="position: relative;">
          <img src="${player.avatar}" alt="${player.name}" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid ${player.online ? 'var(--primary)' : 'var(--glass-border)'};">
          <span class="status-indicator ${player.online ? 'online' : 'offline'}" style="position: absolute; bottom: 2px; right: 2px; width: 16px; height: 16px; border-radius: 50%; background: ${player.online ? 'var(--success)' : 'var(--text-muted)'}; border: 3px solid var(--bg-dark);"></span>
        </div>
        
        <div style="flex: 1; min-width: 200px;">
          <div class="flex align-center gap-2 mb-1">
            <h3 class="text-lg font-heading">${player.name}</h3>
            ${player.online ? '<span class="badge badge-primary">Online</span>' : ''}
          </div>
          
          <p class="text-sm text-muted mb-3">${player.bio}</p>
          
          <div class="flex gap-4 flex-wrap mb-3">
            <span class="flex align-center gap-1 text-sm">
              ${getSportIcon(player.sport)} ${player.sport.charAt(0).toUpperCase() + player.sport.slice(1)}
            </span>
            <span class="flex align-center gap-1 text-sm text-muted">
              <i class="ph-bold ph-signal-high"></i> ${player.skillLevel}
            </span>
            <span class="flex align-center gap-1 text-sm text-primary">
              <i class="ph-bold ph-map-pin"></i> ${player.distance} km
            </span>
          </div>
          
          <div class="flex gap-2 flex-wrap mb-3">
            <span class="badge" style="background: ${getAvailabilityColor(player.availability)}20; color: ${getAvailabilityColor(player.availability)};">
              <i class="ph-bold ph-clock"></i> ${player.availableTime}
            </span>
            ${player.teamId ? `<span class="badge" style="background: var(--accent-glow); color: var(--accent);"><i class="ph-bold ph-users"></i> In Team</span>` : ''}
          </div>
          
          <div class="flex gap-2" style="flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" onclick="inviteToPlay('${player.id}')">
              <i class="ph-bold ph-game-controller"></i> Invite
            </button>
            <button class="btn btn-outline btn-sm" onclick="openChat('${player.id}')">
              <i class="ph-bold ph-chat-teardrop"></i> Chat
            </button>
            ${!player.teamId ? `<button class="btn btn-outline btn-sm" onclick="inviteToTeam('${player.id}')">
              <i class="ph-bold ph-user-plus"></i> Add to Team
            </button>` : ''}
            <button class="btn btn-outline btn-sm text-danger" onclick="reportOrBlockPlayer('${player.id}', '${player.name}')">
              <i class="ph-bold ph-shield-warning"></i> Report/Block
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  
  // Render available players for teams
  renderAvailablePlayers();
}

function renderAvailablePlayers() {
  const container = document.getElementById('available-players-grid');
  const availablePlayers = playersData.filter(p => !p.teamId && p.availability !== 'now');
  
  container.innerHTML = availablePlayers.map(player => `
    <div class="glass-card flex align-center justify-between" style="padding: 1rem;">
      <div class="flex align-center gap-3">
        <img src="${player.avatar}" alt="${player.name}" style="width: 40px; height: 40px; border-radius: 50%;">
        <div>
          <h4 class="font-medium text-sm">${player.name}</h4>
          <p class="text-xs text-muted">${player.sport} • ${player.availableTime}</p>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" onclick="inviteToTeam('${player.id}')">
        <i class="ph-bold ph-user-plus"></i> Invite
      </button>
    </div>
  `).join('');
}

function renderTeams() {
  const container = document.getElementById('teams-grid');
  
  if (teamsData.length === 0) {
    container.innerHTML = `
      <div class="glass-card text-center" style="padding: 3rem;">
        <i class="ph-duotone ph-user-circle-gear text-6xl text-muted mb-4"></i>
        <h3 class="text-xl mb-2">No teams yet</h3>
        <p class="text-muted">Create a team to play with others</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = teamsData.map(team => {
    const leader = playersData.find(p => p.id === team.members[0]);
    return `
      <div class="glass-card" style="padding: 1.5rem;">
        <div class="flex justify-between align-center mb-4">
          <div class="flex align-center gap-3">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: var(--primary-glow); display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ${getSportIcon(team.sport)} text-xl"></i>
            </div>
            <div>
              <h3 class="font-heading">${team.name}</h3>
              <p class="text-sm text-muted">${team.sport.charAt(0).toUpperCase() + team.sport.slice(1)} • ${team.currentPlayers}/${team.maxPlayers} players</p>
            </div>
          </div>
          <span class="badge" style="background: var(--primary-glow); color: var(--primary);">
            <i class="ph-bold ph-clock"></i> ${team.time}
          </span>
        </div>
        
        <div class="flex gap-2 mb-4">
          ${team.members.map(memberId => {
            const member = playersData.find(p => p.id === memberId);
            return member ? `<img src="${member.avatar}" alt="${member.name}" title="${member.name}" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--glass-border);">` : '';
          }).join('')}
          ${Array.from({length: team.lookingFor}).map(() => `
            <div style="width: 36px; height: 36px; border-radius: 50%; border: 2px dashed var(--glass-border); display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-plus text-muted"></i>
            </div>
          `).join('')}
        </div>
        
        <div class="flex gap-2">
          <button class="btn btn-primary btn-sm flex-1">
            <i class="ph-bold ph-calendar-check"></i> Schedule Match
          </button>
          <button class="btn btn-outline btn-sm">
            <i class="ph-bold ph-share-network"></i> Share
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderNotifications() {
  // Load admin notifications from localStorage
  const storedNotifs = JSON.parse(localStorage.getItem('sportssync_notifications') || '[]');
  
  // Combine with default notifications
  const allNotifs = [...storedNotifs, ...notificationsData].slice(0, 20);
  
  const container = document.getElementById('notifications-list');
  
  if (allNotifs.length === 0) {
    container.innerHTML = `
      <div class="glass-card text-center" style="padding: 3rem;">
        <i class="ph-duotone ph-bell-slash text-6xl text-muted mb-4"></i>
        <h3 class="text-xl mb-2">No notifications</h3>
        <p class="text-muted">You're all caught up!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = allNotifs.map(notif => `
    <div class="glass-card ${notif.read ? '' : 'unread'}" style="padding: 1rem; border-left: 3px solid ${getNotificationColor(notif.type)};">
      <div class="flex gap-3">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${getNotificationBg(notif.type)}; display: flex; align-items: center; justify-content: center;">
          <i class="ph-bold ${getNotificationIcon(notif.type)}"></i>
        </div>
        <div style="flex: 1;">
          <div class="flex justify-between align-center mb-1">
            <h4 class="font-medium">${notif.title}</h4>
            <span class="text-xs text-muted">${notif.time}</span>
          </div>
          <p class="text-sm text-muted">${notif.message}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function getNotificationColor(type) {
  const colors = {
    admin: 'var(--danger)',
    invite: 'var(--primary)',
    system: 'var(--accent)'
  };
  return colors[type] || 'var(--text-muted)';
}

function getNotificationBg(type) {
  const colors = {
    admin: 'rgba(239, 68, 68, 0.1)',
    invite: 'rgba(16, 185, 129, 0.1)',
    system: 'rgba(99, 102, 241, 0.1)'
  };
  return colors[type] || 'var(--glass-border)';
}

function getNotificationIcon(type) {
  const icons = {
    admin: 'ph-megaphone text-danger',
    invite: 'ph-user-plus text-primary',
    system: 'ph-gear text-accent'
  };
  return icons[type] || 'ph-bell';
}

function updateNotifBadge() {
  // Count both local and stored notifications
  const storedNotifs = JSON.parse(localStorage.getItem('sportssync_notifications') || '[]');
  const unreadCount = storedNotifs.filter(n => !n.read).length + notificationsData.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = 'inline';
  } else {
    badge.style.display = 'none';
  }
}

function getSportIcon(sport) {
  const icons = {
    football: '⚽',
    tennis: '🎾',
    basketball: '🏀',
    cricket: '🏏'
  };
  return icons[sport] || '🏃';
}

function getAvailabilityColor(availability) {
  const colors = {
    now: 'var(--success)',
    today: 'var(--primary)',
    weekend: 'var(--warning)'
  };
  return colors[availability] || 'var(--text-muted)';
}

function setupFilters() {
  const searchInput = document.getElementById('search-input');
  const sportFilter = document.getElementById('sport-filter');
  const distanceFilter = document.getElementById('distance-filter');
  const availabilityFilter = document.getElementById('availability-filter');
  
  const applyFilters = () => {
    const search = searchInput.value.toLowerCase();
    const sport = sportFilter.value;
    const distance = distanceFilter.value;
    const availability = availabilityFilter.value;
    
    filteredPlayers = playersData.filter(player => {
      if (search && !player.name.toLowerCase().includes(search)) return false;
      if (sport !== 'all' && player.sport !== sport) return false;
      if (distance !== 'all' && player.distance > parseInt(distance)) return false;
      if (availability !== 'all' && player.availability !== availability) return false;
      return true;
    });
    
    renderPlayers();
  };
  
  searchInput.addEventListener('input', applyFilters);
  sportFilter.addEventListener('change', applyFilters);
  distanceFilter.addEventListener('change', applyFilters);
  availabilityFilter.addEventListener('change', applyFilters);
}

window.inviteToPlay = function(playerId) {
  const player = playersData.find(p => p.id === playerId);
  if (!player) return;
  window.notify(`Invitation sent to ${player.name}!`, 'success');
};

window.openChat = function(playerId) {
  currentChatPlayer = playersData.find(p => p.id === playerId);
  if (!currentChatPlayer) return;
  
  document.getElementById('chat-avatar').src = currentChatPlayer.avatar;
  document.getElementById('chat-name').textContent = currentChatPlayer.name;
  document.getElementById('chat-status').textContent = currentChatPlayer.online ? 'Online' : 'Offline';
  
  renderChatMessages();
  document.getElementById('chat-modal').style.display = 'flex';
  
  // Setup chat form
  const form = document.getElementById('chat-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
      sendMessage(message);
      input.value = '';
    }
  };
};

function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  const messages = chatMessages[currentChatPlayer?.id] || [];
  
  if (messages.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted" style="padding: 2rem;">
        <i class="ph-duotone ph-chat-teardrop text-4xl mb-2"></i>
        <p>No messages yet. Start the conversation!</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = messages.map(msg => `
    <div class="flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}">
      <div style="max-width: 70%; padding: 0.75rem 1rem; border-radius: 12px; background: ${msg.from === 'me' ? 'var(--primary)' : 'var(--bg-card-hover)'};">
        <p class="text-sm">${msg.text}</p>
        <span class="text-xs" style="opacity: 0.7;">${msg.time}</span>
      </div>
    </div>
  `).join('');
  
  container.scrollTop = container.scrollHeight;
}

function sendMessage(text) {
  if (!currentChatPlayer) return;
  
  if (!chatMessages[currentChatPlayer.id]) {
    chatMessages[currentChatPlayer.id] = [];
  }
  
  chatMessages[currentChatPlayer.id].push({
    from: 'me',
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  
  // Simulate reply
  setTimeout(() => {
    chatMessages[currentChatPlayer.id].push({
      from: 'them',
      text: `Hey! Sure, let's play together sometime!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    renderChatMessages();
  }, 1500);
  
  renderChatMessages();
}

window.closeChatModal = function() {
  document.getElementById('chat-modal').style.display = 'none';
  currentChatPlayer = null;
};

window.createTeam = function() {
  document.getElementById('team-modal').style.display = 'flex';
  
  const form = document.getElementById('team-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('team-name').value;
    const sport = document.getElementById('team-sport').value;
    const size = parseInt(document.getElementById('team-size').value);
    const availability = document.getElementById('team-availability').value;
    
    const newTeam = {
      id: `t${Date.now()}`,
      name,
      sport,
      maxPlayers: size,
      currentPlayers: 1,
      leader: 'p1',
      members: ['p1'],
      availability,
      time: availability === 'today' ? 'Today' : availability === 'tomorrow' ? 'Tomorrow' : 'Saturday 10 AM',
      lookingFor: size - 1
    };
    
    teamsData.push(newTeam);
    renderTeams();
    closeTeamModal();
    window.notify('Team created successfully!', 'success');
    
    // Switch to teams tab
    document.querySelector('[data-tab="teams"]').click();
  };
};

window.closeTeamModal = function() {
  document.getElementById('team-modal').style.display = 'none';
};

window.inviteToTeam = function(playerId) {
  const player = playersData.find(p => p.id === playerId);
  if (!player) return;
  window.notify(`Team invitation sent to ${player.name}!`, 'success');
};

window.clearNotifications = function() {
  notificationsData = [];
  localStorage.removeItem('sportssync_notifications');
  renderNotifications();
  updateNotifBadge();
  window.notify('All notifications cleared', 'info');
};

window.reportOrBlockPlayer = function(playerId, playerName) {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  
  modal.innerHTML = `
    <div class="glass-card" style="max-width:400px;padding:2rem;border-radius:16px;">
      <div class="flex align-center justify-between mb-4">
        <h3 class="text-xl font-heading">Report or Block</h3>
        <button onclick="this.closest('[style*=\'fixed\']').remove()" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:1.5rem;">
          <i class="ph-bold ph-x"></i>
        </button>
      </div>
      <p class="text-muted text-sm mb-4">Select action for <strong>${playerName}</strong>:</p>
      <div class="flex flex-column gap-3">
        <button class="btn btn-outline w-full" onclick="submitPlayerReport('${playerId}', '${playerName}')" style="justify-content:flex-start;padding:1rem;">
          <i class="ph-bold ph-flag text-warning"></i> Report User
        </button>
        <button class="btn btn-outline w-full text-danger" onclick="blockPlayer('${playerId}', '${playerName}')" style="justify-content:flex-start;padding:1rem;">
          <i class="ph-bold ph-prohibit"></i> Block User
        </button>
      </div>
      <div id="report-reason-container" style="display:none;margin-top:1rem;">
        <label class="text-sm text-muted mb-2" style="display:block;">Reason:</label>
        <select id="player-report-reason" class="input-field mb-3" style="width:100%;padding:0.75rem;border-radius:8px;">
          <option value="harassment">Harassment</option>
          <option value="spam">Spam</option>
          <option value="inappropriate">Inappropriate Behavior</option>
          <option value="fake">Fake Profile</option>
          <option value="other">Other</option>
        </select>
        <button class="btn btn-primary w-full" onclick="confirmPlayerReport()">Submit Report</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
};

window.submitPlayerReport = function(playerId, playerName) {
  document.getElementById('report-reason-container').style.display = 'block';
  window.currentReportPlayer = playerName;
};

window.confirmPlayerReport = function() {
  const reason = document.getElementById('player-report-reason').value;
  window.notify('Report submitted. Admin will review it.', 'success');
  document.querySelector('[style*="position:fixed"]').remove();
};

window.blockPlayer = function(playerId, playerName) {
  if (confirm('Are you sure you want to block ' + playerName + '?')) {
    window.notify(playerName + ' has been blocked.', 'success');
    document.querySelector('[style*="position:fixed"]').remove();
  }
};
