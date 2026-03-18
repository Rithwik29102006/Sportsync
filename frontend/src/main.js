import './style.css';
import API_BASE_URL, { testApiConnection } from './config/api.js';

// Page Imports
import { Home } from './pages/Home.js';
import { LoginPage } from './pages/LoginPage.js';
import { UserDashboard } from './pages/UserDashboard.js';
import { SlotsPage } from './pages/SlotsPage.js';
import { MapPage } from './pages/MapPage.js';
import { LearnPage } from './pages/LearnPage.js';
import { FriendsPage } from './pages/FriendsPage.js';
import { ChatBooking } from './pages/ChatBooking.js';
import { AdminDashboard } from './pages/AdminDashboard.js';
import { AdminUsersPage } from './pages/AdminUsersPage.js';
import { AdminSlotsPage } from './pages/AdminSlotsPage.js';
import { AdminGamesPage } from './pages/AdminGamesPage.js';
import { TrainerDashboard } from './pages/TrainerDashboard.js';
import { TrainerStudentsPage } from './pages/TrainerStudentsPage.js';
import { TrainerPaymentsPage } from './pages/TrainerPaymentsPage.js';
import { TrainerTimetablePage } from './pages/TrainerTimetablePage.js';
import { TrainerBookingPage } from './pages/TrainerBookingPage.js';
import { TutorialsPage } from './pages/TutorialsPage.js';

console.log('🚀 SportsSync main.js loading robust version...');

// Shared Error UI
const renderError = (message, source = '') => `
  <div style="color:red; padding: 2rem; background: #fff1f2; border: 1px solid #fda4af; border-radius: 8px; margin: 2rem; font-family: system-ui;">
    <h3 style="margin-top:0">❌ Application Error</h3>
    <p><strong>Error:</strong> ${message}</p>
    ${source ? `<p style="font-size:0.8rem;color:#666">Source: ${source}</p>` : ''}
    <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Reload Page
    </button>
  </div>
`;

window.onerror = function(message, source, lineno, colno, error) {
  console.error('❌ JavaScript Error:', { message, source, lineno, colno, error });
  const appContainer = document.getElementById('main-content');
  if (appContainer) {
    appContainer.innerHTML = renderError(message, `${source}:${lineno}`);
  }
};

window.onunhandledrejection = function(event) {
  console.error('❌ Unhandled Promise Rejection:', event.reason);
  window.notify && window.notify('Network error occurred. Check your connection.', 'error');
  event.preventDefault();
};

// Global State
window.appState = {
  user: null,
  activities: [],
  adminStats: null,
  grounds: []
};

const appContainer = document.getElementById('main-content');
const navbarContainer = document.getElementById('navbar-container');

// Simple Router
const routes = {
  '/': Home,
  '/login': LoginPage,
  '/dashboard': UserDashboard,
  '/profile': UserDashboard,
  '/slots': SlotsPage,
  '/map': MapPage,
  '/learn': LearnPage,
  '/friends': FriendsPage,
  '/chat': ChatBooking,
  '/admin': AdminDashboard,
  '/admin/users': AdminUsersPage,
  '/admin/slots': AdminSlotsPage,
  '/admin/games': AdminGamesPage,
  '/trainer': TrainerDashboard,
  '/trainer/students': TrainerStudentsPage,
  '/trainer/payments': TrainerPaymentsPage,
  '/trainer/timetable': TrainerTimetablePage,
  '/trainer/bookings': TrainerBookingPage,
  '/tutorials': TutorialsPage
};

function renderNavbar() {
  if (!navbarContainer) return;
  
  const isLoggedIn = window.appState.user !== null;
  const user = window.appState.user;
  const isAdmin = user && user.type === 'admin';
  const isTrainer = user && user.type === 'trainer';
  
  let navItems = '';
  
  if (isTrainer) {
    navItems = `
      <a href="/trainer" class="btn-ghost btn-sm" data-link>Dashboard</a>
      <a href="/trainer/students" class="btn-ghost btn-sm" data-link>Students</a>
      <a href="/trainer/timetable" class="btn-ghost btn-sm" data-link>Timetable</a>
      <a href="/trainer/payments" class="btn-ghost btn-sm" data-link>Earnings</a>
    `;
  } else if (isAdmin) {
    navItems = `
      <a href="/admin" class="btn-ghost btn-sm" data-link>Admin Panal</a>
      <a href="/admin/users" class="btn-ghost btn-sm" data-link>Users</a>
      <a href="/admin/slots" class="btn-ghost btn-sm" data-link>Manage Slots</a>
    `;
  } else {
    // Basic User / Public
    navItems = `
      <a href="/slots" class="btn-ghost btn-sm" data-link>Book</a>
      <a href="/map" class="btn-ghost btn-sm" data-link>Grounds</a>
      <a href="/learn" class="btn-ghost btn-sm" data-link>Learn</a>
    `;
  }
  
  navbarContainer.innerHTML = `
    <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(9, 9, 11, 0.85); backdrop-filter: blur(16px); border-bottom: 1px solid var(--glass-border);">
      <div class="container flex align-center justify-between" style="height: 4.5rem;">
        <a href="/" class="flex align-center gap-2" data-link>
          <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px var(--primary-glow);">
            <i class="ph-fill ph-volleyball" style="color: white; font-size: 1.2rem;"></i>
          </div>
          <span class="font-heading font-bold text-xl tracking-tight">Sports<span class="text-primary">Sync</span></span>
        </a>
        
        <nav class="flex gap-1 align-center">
          ${navItems}
          
          <div style="width: 1px; height: 20px; background: var(--glass-border); margin: 0 0.5rem;"></div>
          
          ${isLoggedIn ? `
            <div class="flex align-center gap-3">
              <a href="${isTrainer ? '/trainer' : isAdmin ? '/admin' : '/profile'}" class="flex align-center gap-2" data-link style="padding: 0.25rem 0.5rem; border-radius: 8px; transition: background 0.2s;">
                <img src="${user.avatar || 'https://i.pravatar.cc/150?u=' + user.id}" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--glass-border);">
                <span class="text-sm font-medium d-none-mobile">${user.name.split(' ')[0]}</span>
              </a>
              <button onclick="window.logout()" class="btn btn-outline btn-sm" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Logout</button>
            </div>
          ` : `
            <a href="/login" class="btn btn-primary btn-sm" data-link>Sign In</a>
          `}
        </nav>
      </div>
    </header>
  `;

  // Attach link events
  navbarContainer.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.navigateTo(e.currentTarget.getAttribute('href'));
    });
  });
}

window.logout = function() {
  window.appState.user = null;
  localStorage.removeItem('sportssync_user');
  window.notify('Logged out successfully', 'info');
  window.navigateTo('/');
};

window.navigateTo = function(url) {
  history.pushState(null, null, url);
  router();
};

function router() {
  if (!appContainer) return;
  
  const path = window.location.pathname;
  const routeParams = path.split('?')[0];
  const renderFunction = routes[routeParams] || routes['/'];
  
  // Scroll to top on navigation
  window.scrollTo(0, 0);
  
  try {
    appContainer.innerHTML = renderFunction();
    renderNavbar();
    
    // Re-attach data-link events for the new content
    appContainer.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        window.navigateTo(e.currentTarget.getAttribute('href'));
      });
    });
  } catch (err) {
    console.error('Router render error:', err);
    appContainer.innerHTML = renderError(`Failed to load page "${routeParams}": ${err.message}`);
  }
}

window.addEventListener('popstate', router);

// Initialize App
async function init() {
  console.log('🔄 Initializing robust app...');
  
  try {
    // Check for stored user session
    const storedUser = localStorage.getItem('sportssync_user');
    if (storedUser) {
      try {
        window.appState.user = JSON.parse(storedUser);
        console.log('✅ User session restored:', window.appState.user.name);
      } catch (e) {
        console.warn('Corrupted user session found, clearing.');
        localStorage.removeItem('sportssync_user');
      }
    }
    
    renderNavbar();
    router();
    
    // Test API in background
    testApiConnection().then(ok => {
      if (!ok) console.warn('⚠️ Backend API appears to be offline. Using fallback data.');
    });

    console.log('✅ App initialized successfully');
  } catch (err) {
    console.error('❌ Failed to initialize app:', err);
    if (appContainer) {
      appContainer.innerHTML = renderError(`Failed to initialize the application: ${err.message}`);
    }
  }
}

// Global Notification System
window.notify = function(message, type = 'info') {
  const notification = document.createElement('div');
  const bg = type === 'success' ? 'linear-gradient(135deg, #059669, #10b981)' : 
             type === 'error' ? 'linear-gradient(135deg, #b91c1c, #ef4444)' : 
             'linear-gradient(135deg, #4f46e5, #6366f1)';
             
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 1rem 1.5rem;
    background: ${bg};
    color: white;
    border-radius: 12px;
    z-index: 9999;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.1);
    animation: slideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `;
  
  const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'warning-circle' : 'info';
  notification.innerHTML = `<i class="ph-fill ph-${icon}" style="font-size: 1.25rem;"></i><span>${message}</span>`;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOutDown 0.4s ease forwards';
    setTimeout(() => notification.remove(), 400);
  }, 4000);
};

// Add necessary animations globally if not in style.css
const extraStyles = document.createElement('style');
extraStyles.textContent = `
  @keyframes slideInUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeOutDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }
  .d-none-mobile { @media (max-width: 640px) { display: none; } }
`;
document.head.appendChild(extraStyles);

// Let's go!
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
