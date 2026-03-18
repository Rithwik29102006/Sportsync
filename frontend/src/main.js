import './style.css';

window.onerror = function(message, source, lineno, colno, error) {
  document.body.innerHTML = `<div style="color:red; padding: 2rem; background: white; z-index:9999; position:relative;"><h3>JS Error</h3><p>${message}</p><p>${source}:${lineno}</p></div>`;
};

// Importing Pages
import { Home } from './pages/Home.js';
import { UserDashboard } from './pages/UserDashboard.js';
import { TrainerDashboard } from './pages/TrainerDashboard.js';
import { TrainerStudentsPage } from './pages/TrainerStudentsPage.js';
import { TrainerPaymentsPage } from './pages/TrainerPaymentsPage.js';
import { TrainerTimetablePage } from './pages/TrainerTimetablePage.js';
import { ChatBooking } from './pages/ChatBooking.js';
import { AdminDashboard } from './pages/AdminDashboard.js';
import { SlotsPage } from './pages/SlotsPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { MapPage } from './pages/MapPage.js';
import { FriendsPage } from './pages/FriendsPage.js';
import { LearnPage } from './pages/LearnPage.js';
import { ReportBlockPage } from './pages/ReportBlockPage.js';
import { AdminUsersPage } from './pages/AdminUsersPage.js';
import { AdminGamesPage } from './pages/AdminGamesPage.js';
import { AdminSlotsPage } from './pages/AdminSlotsPage.js';
import { NotificationManager } from './components/NotificationManager.js';

// Simple Client-Side Router
const routes = {
  '/': () => { 
    appContainer.innerHTML = Home();
    // Render navbar after Home loads
    renderNavbar();
  },
  '/dashboard': () => { 
    if (window.appState.user && window.appState.user.type === 'user') {
      appContainer.innerHTML = UserDashboard();
    } else {
      navigateTo('/login');
    }
  },
  '/trainer-dashboard': () => { 
    if (window.appState.user && window.appState.user.type === 'trainer') {
      appContainer.innerHTML = TrainerDashboard();
    } else {
      navigateTo('/login');
    }
  },
  '/students': () => { 
    if (window.appState.user && window.appState.user.type === 'trainer') {
      appContainer.innerHTML = TrainerStudentsPage();
    } else {
      navigateTo('/login');
    }
  },
  '/payments': () => { 
    if (window.appState.user && window.appState.user.type === 'trainer') {
      appContainer.innerHTML = TrainerPaymentsPage();
    } else {
      navigateTo('/login');
    }
  },
  '/timetable': () => { 
    if (window.appState.user && window.appState.user.type === 'trainer') {
      appContainer.innerHTML = TrainerTimetablePage();
    } else {
      navigateTo('/login');
    }
  },
  '/booking': () => { appContainer.innerHTML = ChatBooking(); },
  '/slots': () => { appContainer.innerHTML = SlotsPage(); },
  '/map': () => { appContainer.innerHTML = MapPage(); },
  '/friends': () => { appContainer.innerHTML = FriendsPage(); },
  '/learn': () => { appContainer.innerHTML = LearnPage(); },
  '/report': () => { appContainer.innerHTML = ReportBlockPage(); },
  '/profile': () => { 
    // Redirect to role-specific profile page
    const user = window.appState.user;
    if (user && user.type === 'admin') {
      navigateTo('/admin');
    } else if (user && user.type === 'trainer') {
      navigateTo('/trainer-dashboard');
    } else if (user && user.type === 'user') {
      navigateTo('/dashboard');
    } else {
      navigateTo('/login');
    }
  },
  '/login': () => { appContainer.innerHTML = LoginPage(); },
  '/admin': () => { 
    if (window.appState.user && window.appState.user.type === 'admin') {
      appContainer.innerHTML = AdminDashboard();
    } else {
      navigateTo('/login');
    }
  },
  '/admin-users': () => { 
    if (window.appState.user && window.appState.user.type === 'admin') {
      appContainer.innerHTML = AdminUsersPage();
    } else {
      navigateTo('/login');
    }
  },
  '/admin-games': () => { 
    if (window.appState.user && window.appState.user.type === 'admin') {
      appContainer.innerHTML = AdminGamesPage();
    } else {
      navigateTo('/login');
    }
  },
  '/admin-slots': () => { 
    if (window.appState.user && window.appState.user.type === 'admin') {
      appContainer.innerHTML = AdminSlotsPage();
    } else {
      navigateTo('/login');
    }
  }
};

// Global State
window.appState = {
  user: null,
  activities: [],
  adminStats: null,
  grounds: []
};
const API_BASE_URL = 'http://localhost:3000/api';

const appContainer = document.getElementById('main-content');
const navbarContainer = document.getElementById('navbar-container');

// Temp render until pages are created
function renderTemp(title) {
  appContainer.innerHTML = `
    <div class="container" style="display:flex; justify-content:center; align-items:center; min-height: 60vh;">
      <div class="glass-card" style="text-align:center;">
        <h1 class="text-4xl text-gradient mb-4">${title}</h1>
        <p class="text-muted mb-6">This page is under construction.</p>
      </div>
    </div>
  `;
}

function renderNavbar() {
  const isLoggedIn = window.appState.user !== null;
  const userType = window.appState.user ? window.appState.user.type : null;
  const userName = window.appState.user ? window.appState.user.name : '';
  const userAvatar = window.appState.user ? window.appState.user.avatar : '';
  
  // Don't show navbar if not logged in
  if (!isLoggedIn) {
    navbarContainer.innerHTML = '';
    return;
  }
  
  let navLinks = '';
  
  if (userType === 'admin') {
    navLinks = `
      <a href="/admin" class="nav-link font-medium text-muted hover-text-main transition" data-link>Dashboard</a>
      <a href="/admin-users" class="nav-link font-medium text-muted hover-text-main transition" data-link>Users</a>
      <a href="/admin-games" class="nav-link font-medium text-muted hover-text-main transition" data-link>Games</a>
      <a href="/admin-slots" class="nav-link font-medium text-muted hover-text-main transition" data-link>Slots</a>
    `;
  } else if (userType === 'trainer') {
    navLinks = `
      <a href="/trainer-dashboard" class="nav-link font-medium text-muted hover-text-main transition" data-link>My Dashboard</a>
      <a href="/students" class="nav-link font-medium text-muted hover-text-main transition" data-link>Students</a>
      <a href="/payments" class="nav-link font-medium text-muted hover-text-main transition" data-link>Payments</a>
      <a href="/timetable" class="nav-link font-medium text-muted hover-text-main transition" data-link>Timetable</a>
    `;
  } else {
    navLinks = `
      <a href="/dashboard" class="nav-link font-medium text-muted hover-text-main transition" data-link>My Dashboard</a>
      <a href="/slots" class="nav-link font-medium text-muted hover-text-main transition" data-link>Book Slots</a>
      <a href="/map" class="nav-link font-medium text-muted hover-text-main transition" data-link>Find Grounds</a>
      <a href="/learn" class="nav-link font-medium text-muted hover-text-main transition" data-link>Learn</a>
      <a href="/friends" class="nav-link font-medium text-muted hover-text-main transition" data-link>Find Friends</a>
    `;
  }
  
  const profileSection = isLoggedIn ? `
    <div class="profile-dropdown">
      <button class="profile-btn flex align-center gap-2" style="background: transparent; border: none; cursor: pointer; padding: 0.25rem; border-radius: 8px;">
        <img src="${userAvatar || 'https://i.pravatar.cc/150?u=default'}" alt="Profile" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--primary);">
        <span class="font-medium text-sm" style="color: var(--text-main);">${userName}</span>
        <i class="ph-bold ph-caret-down text-sm" style="color: var(--text-muted);"></i>
      </button>
      <div class="dropdown-menu" style="display: none; position: absolute; top: 100%; right: 0; background: var(--bg-card); border: 1px solid var(--glass-border); border-radius: 8px; padding: 0.5rem; min-width: 180px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
        <div style="padding: 0.75rem; border-bottom: 1px solid var(--glass-border); margin-bottom: 0.5rem;">
          <p class="font-medium text-sm">${userName}</p>
          <p class="text-xs text-muted">${userType === 'trainer' ? 'Trainer' : userType === 'admin' ? 'Admin' : 'User'}</p>
        </div>
        <button onclick="window.showEditProfile()" class="dropdown-item" style="width: 100%; text-align: left; padding: 0.5rem 0.75rem; background: transparent; border: none; color: var(--text-main); cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem;">
          <i class="ph-bold ph-pencil-simple"></i> Edit Profile
        </button>
        <button onclick="logout()" class="dropdown-item" style="width: 100%; text-align: left; padding: 0.5rem 0.75rem; background: transparent; border: none; color: var(--text-main); cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem;">
          <i class="ph-bold ph-sign-out"></i> Logout
        </button>
      </div>
    </div>
  ` : `
    <a href="/login" class="btn btn-primary btn-sm" data-link style="padding: 0.5rem 1rem; border-radius: 8px;">
      <i class="ph-bold ph-sign-in"></i> Login
    </a>
  `;
  
  navbarContainer.innerHTML = `
    <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(9, 9, 11, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid var(--glass-border);">
      <div class="container flex align-center justify-between" style="height: 4.5rem;">
        <a href="/" class="flex align-center gap-2" data-link>
          <i class="ph-fill ph-volleyball text-primary text-3xl"></i>
          <span class="font-heading font-bold text-xl tracking-tight">Sports<span class="text-primary">Sync</span></span>
        </a>
        <nav class="flex gap-4 align-center">
          ${navLinks}
          ${profileSection}
        </nav>
      </div>
    </header>
  `;

  // Attach link events
  navbarContainer.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(e.currentTarget.getAttribute('href'));
    });
  });
  
  // Profile dropdown toggle
  const profileBtn = navbarContainer.querySelector('.profile-btn');
  const dropdownMenu = navbarContainer.querySelector('.dropdown-menu');
  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', () => {
      dropdownMenu.style.display = 'none';
    });
  }
}

// Logout function
window.logout = function() {
  window.appState.user = null;
  localStorage.removeItem('sportssync_user');
  window.notify('Logged out successfully', 'info');
  // Redirect to login page and reload
  history.pushState(null, null, '/login');
  window.location.reload();
};

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}

function router() {
  const path = window.location.pathname;
  const routeParams = path.split('?')[0];
  const renderFunction = routes[routeParams] || routes['/'];
  renderFunction();
  
  // Re-render navbar after navigation
  renderNavbar();
  
  // Highlight active nav
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.remove('text-muted');
      link.classList.add('text-main');
    } else {
      link.classList.add('text-muted');
      link.classList.remove('text-main');
    }
  });
}

window.addEventListener('popstate', router);

// Initialize App
async function init() {
  try {
    // Check for stored user session
    const storedUser = localStorage.getItem('sportssync_user');
    if (storedUser) {
      window.appState.user = JSON.parse(storedUser);
    }
    // If no stored user, keep user as null (not logged in)
  } catch (err) {
    console.error('Failed to initialize app state:', err);
  }
  
  renderNavbar();
  router();
}

document.addEventListener('DOMContentLoaded', init);

// Make renderNavbar globally accessible
window.renderNavbar = renderNavbar;

// Report/Block Modal
window.showReportBlockModal = function() {
  const modal = document.createElement('div');
  modal.id = 'report-block-modal';
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  
  modal.innerHTML = `
    <div class="glass-card" style="max-width: 450px; padding: 2rem; border-radius: 16px;">
      <div class="flex align-center justify-between mb-4">
        <h3 class="text-xl font-heading">Report or Block User</h3>
        <button onclick="document.getElementById('report-block-modal').remove()" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:1.5rem;">
          <i class="ph-bold ph-x"></i>
        </button>
      </div>
      <p class="text-muted text-sm mb-4">Select a user to report or block:</p>
      <select id="report-user-select" class="input-field mb-3" style="width:100%;padding:0.75rem;border-radius:8px;">
        <option value="">Choose a user...</option>
        <option value="u1">John Doe (user@sportssync.com)</option>
        <option value="u2">Sarah Smith (sarah@example.com)</option>
        <option value="u3">Mike Johnson (mike@example.com)</option>
        <option value="u4">Emma Davis (emma@example.com)</option>
      </select>
      <div class="flex gap-2 mb-4">
        <button class="btn btn-outline flex-1" onclick="submitReport('harassment')" style="flex:1;">
          <i class="ph-bold ph-flag"></i> Report
        </button>
        <button class="btn btn-outline text-danger flex-1" onclick="submitBlock()" style="flex:1;">
          <i class="ph-bold ph-prohibit"></i> Block
        </button>
      </div>
      <div id="report-reason-section" style="display:none;">
        <label class="text-sm text-muted mb-2" style="display:block;">Reason:</label>
        <select id="report-reason" class="input-field mb-3" style="width:100%;padding:0.75rem;border-radius:8px;">
          <option value="harassment">Harassment</option>
          <option value="spam">Spam</option>
          <option value="inappropriate">Inappropriate Behavior</option>
          <option value="fake">Fake Profile</option>
          <option value="other">Other</option>
        </select>
        <textarea id="report-details" class="input-field mb-3" rows="2" placeholder="Additional details..." style="width:100%;padding:0.75rem;border-radius:8px;resize:vertical;"></textarea>
        <button class="btn btn-primary w-full" onclick="confirmReport()">Submit Report</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
};

window.submitReport = function() {
  const userId = document.getElementById('report-user-select').value;
  if (!userId) {
    window.notify('Please select a user first', 'error');
    return;
  }
  document.getElementById('report-reason-section').style.display = 'block';
};

window.submitBlock = function() {
  const userId = document.getElementById('report-user-select').value;
  if (!userId) {
    window.notify('Please select a user first', 'error');
    return;
  }
  window.notify('User has been blocked successfully', 'success');
  document.getElementById('report-block-modal').remove();
};

window.confirmReport = function() {
  const reason = document.getElementById('report-reason').value;
  const details = document.getElementById('report-details').value;
  window.notify('Report submitted. Admin will review it.', 'success');
  document.getElementById('report-block-modal').remove();
};

window.showEditProfile = function() {
  const user = window.appState.user;
  if (!user) return;
  
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
  
  modal.innerHTML = `
    <div class="glass-card" style="max-width:500px;padding:2rem;border-radius:16px;max-height:90vh;overflow-y:auto;">
      <div class="flex align-center justify-between mb-4">
        <h3 class="text-xl font-heading">Edit Profile</h3>
        <button onclick="this.closest('[style*=\'fixed\']').remove()" style="background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:1.5rem;">
          <i class="ph-bold ph-x"></i>
        </button>
      </div>
      <div class="text-center mb-4">
        <img src="${user.avatar}" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--primary); margin-bottom: 1rem;">
        <button class="btn btn-outline btn-sm" onclick="window.notify('Photo upload coming soon', 'info')">Change Photo</button>
      </div>
      <form onsubmit="event.preventDefault();saveProfile()">
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Full Name</label>
          <input type="text" id="edit-name" class="input-field" value="${user.name}" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Email</label>
          <input type="email" id="edit-email" class="input-field" value="${user.email || ''}" required style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Phone</label>
          <input type="tel" id="edit-phone" class="input-field" placeholder="Enter phone number" style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        ${user.type === 'trainer' ? `
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Sport</label>
          <select id="edit-sport" class="input-field" style="width:100%;padding:0.75rem;border-radius:8px;">
            <option value="cricket" ${user.sport === 'cricket' ? 'selected' : ''}>Cricket</option>
            <option value="football" ${user.sport === 'football' ? 'selected' : ''}>Football</option>
            <option value="tennis" ${user.sport === 'tennis' ? 'selected' : ''}>Tennis</option>
            <option value="basketball" ${user.sport === 'basketball' ? 'selected' : ''}>Basketball</option>
            <option value="badminton" ${user.sport === 'badminton' ? 'selected' : ''}>Badminton</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Experience</label>
          <input type="text" id="edit-experience" class="input-field" value="${user.stats?.experience || ''}" placeholder="e.g., 5 years" style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        ` : ''}
        <div class="mb-3">
          <label class="text-sm text-muted mb-1" style="display:block;">Location</label>
          <input type="text" id="edit-location" class="input-field" placeholder="Enter your location" style="width:100%;padding:0.75rem;border-radius:8px;">
        </div>
        <div class="flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary" style="flex:1;">Save Changes</button>
          <button type="button" class="btn btn-outline" onclick="this.closest('[style*=\'fixed\']').remove()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
};

window.saveProfile = function() {
  const name = document.getElementById('edit-name').value;
  const email = document.getElementById('edit-email').value;
  const phone = document.getElementById('edit-phone').value;
  const location = document.getElementById('edit-location').value;
  
  // Update user state
  window.appState.user.name = name;
  window.appState.user.email = email;
  window.appState.user.phone = phone;
  window.appState.user.location = location;
  
  if (document.getElementById('edit-sport')) {
    window.appState.user.sport = document.getElementById('edit-sport').value;
  }
  if (document.getElementById('edit-experience')) {
    window.appState.user.stats = window.appState.user.stats || {};
    window.appState.user.stats.experience = document.getElementById('edit-experience').value;
  }
  
  // Save to localStorage
  localStorage.setItem('sportssync_user', JSON.stringify(window.appState.user));
  
  window.notify('Profile updated successfully!', 'success');
  document.querySelector('[style*="position:fixed"]').remove();
  
  // Re-render navbar to show new name
  renderNavbar();
};
