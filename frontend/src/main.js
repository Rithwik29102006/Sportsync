// Temporarily remove CSS import to test
// import './style.css';
// import API_BASE_URL, { testApiConnection } from './config/api.js';

console.log('🚀 SportsSync main.js loading...');

window.onerror = function(message, source, lineno, colno, error) {
  console.error('❌ JavaScript Error:', { message, source, lineno, colno, error });
  document.body.innerHTML = `
    <div style="color:red; padding: 2rem; background: white; z-index:9999; position:relative; font-family: system-ui;">
      <h3>❌ Application Error</h3>
      <p><strong>Error:</strong> ${message}</p>
      <p><strong>File:</strong> ${source}:${lineno}</p>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Reload Page
      </button>
    </div>
  `;
};

// Add unhandled promise rejection handler
window.onunhandledrejection = function(event) {
  console.error('❌ Unhandled Promise Rejection:', event.reason);
  document.body.innerHTML = `
    <div style="color:orange; padding: 2rem; background: white; z-index:9999; position:relative; font-family: system-ui;">
      <h3>⚠️ Network Error</h3>
      <p>The application encountered a network error. This might be due to:</p>
      <ul style="text-align: left; margin: 1rem 0;">
        <li>Backend server is temporarily unavailable</li>
        <li>Network connectivity issues</li>
        <li>CORS configuration problems</li>
      </ul>
      <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Try Again
      </button>
    </div>
  `;
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

// Simple Home page function to avoid import issues
function Home() {
  const isLoggedIn = window.appState.user !== null;
  
  return `
    <div class="container page-transition" style="padding-top: ${isLoggedIn ? '6rem' : '4rem'}; padding-bottom: 4rem;">
      <!-- Hero Section -->
      <section class="flex align-center justify-between" style="min-height: 60vh; flex-wrap: wrap; gap: 4rem;">
        <div style="flex: 1; min-width: 300px;">
          <div class="badge badge-primary mb-4 animate-pulse-glow">✨ The New Way to Play</div>
          <h1 class="text-5xl font-heading mb-6 leading-tight">
            Connect, Book, and 
            <span class="text-gradient">Play Together.</span>
          </h1>
          <p class="text-lg text-muted mb-8" style="max-width: 500px;">
            SportsSync is the ultimate platform for sports enthusiast. Find partners, discover grounds, and book slots instantly through an AI-powered chat interface.
          </p>
          <div class="flex gap-4" style="flex-wrap: wrap;">
            ${isLoggedIn ? `
              <a href="/dashboard" data-link class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.125rem;">
                <i class="ph-bold ph-dashboard"></i> My Dashboard
              </a>
              <a href="/slots" data-link class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.125rem;">
                <i class="ph-bold ph-calendar-plus"></i> Book a Slot
              </a>
            ` : `
              <a href="/slots" data-link class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.125rem;">
                <i class="ph-bold ph-calendar-plus"></i> Book a Slot
              </a>
              <a href="/login" data-link class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.125rem;">
                <i class="ph-bold ph-sign-in"></i> Sign In
              </a>
            `}
          </div>
        </div>
        <div style="flex: 1; min-width: 300px;">
          <img src="/src/assets/hero.png" alt="Sports App" style="width: 100%; height: auto; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        </div>
      </section>
    </div>
  `;
}

// Simple router with just Home page for now
const routes = {
  '/': () => { 
    appContainer.innerHTML = Home();
    renderNavbar();
  },
  '/login': () => {
    appContainer.innerHTML = `
      <div class="container page-transition" style="padding-top: 4rem; max-width: 400px; margin: 0 auto;">
        <div class="glass-card" style="padding: 2rem;">
          <h2 class="text-2xl font-heading mb-6 text-center">Welcome Back</h2>
          <form onsubmit="handleLogin(event)">
            <div class="mb-4">
              <label class="text-sm text-muted mb-2" style="display: block;">Email</label>
              <input type="email" class="input-field" placeholder="Enter your email" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--glass-border);">
            </div>
            <div class="mb-6">
              <label class="text-sm text-muted mb-2" style="display: block;">Password</label>
              <input type="password" class="input-field" placeholder="Enter your password" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--glass-border);">
            </div>
            <button type="submit" class="btn btn-primary w-full">Sign In</button>
          </form>
          <p class="text-center text-muted mt-4">
            Don't have an account? <a href="/login" data-link class="text-main">Sign up</a>
          </p>
        </div>
      </div>
    `;
    renderNavbar();
  }
};

// Simple login handler
window.handleLogin = function(event) {
  event.preventDefault();
  // Mock login for now
  window.appState.user = {
    id: '1',
    name: 'Demo User',
    email: 'demo@sportssync.com',
    type: 'user',
    avatar: 'https://i.pravatar.cc/150?u=demo'
  };
  localStorage.setItem('sportssync_user', JSON.stringify(window.appState.user));
  window.notify('Login successful!', 'success');
  navigateTo('/');
};

function renderNavbar() {
  const isLoggedIn = window.appState.user !== null;
  const userName = window.appState.user ? window.appState.user.name : '';
  
  navbarContainer.innerHTML = `
    <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(9, 9, 11, 0.8); backdrop-filter: blur(12px); border-bottom: 1px solid var(--glass-border);">
      <div class="container flex align-center justify-between" style="height: 4.5rem;">
        <a href="/" class="flex align-center gap-2" data-link>
          <i class="ph-fill ph-volleyball text-primary text-3xl"></i>
          <span class="font-heading font-bold text-xl tracking-tight">Sports<span class="text-primary">Sync</span></span>
        </a>
        <nav class="flex gap-4 align-center">
          ${isLoggedIn ? `
            <span class="text-muted">Welcome, ${userName}</span>
            <button onclick="logout()" class="btn btn-outline btn-sm">Logout</button>
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
      navigateTo(e.currentTarget.getAttribute('href'));
    });
  });
}

// Logout function
window.logout = function() {
  window.appState.user = null;
  localStorage.removeItem('sportssync_user');
  window.notify('Logged out successfully', 'info');
  navigateTo('/');
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
}

window.addEventListener('popstate', router);

// Initialize App
async function init() {
  console.log('🔄 Initializing app...');
  
  try {
    // Check for stored user session
    const storedUser = localStorage.getItem('sportssync_user');
    if (storedUser) {
      window.appState.user = JSON.parse(storedUser);
      console.log('✅ User session restored');
    }
    
    console.log('🚀 Starting router...');
    renderNavbar();
    router();
    console.log('✅ App initialized successfully');
  } catch (err) {
    console.error('❌ Failed to initialize app:', err);
    appContainer.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 60vh; font-family: system-ui;">
        <div style="text-align: center; padding: 2rem;">
          <h3 style="color: #dc3545; margin-bottom: 1rem;">⚠️ Startup Error</h3>
          <p style="color: #666; margin-bottom: 1rem;">Failed to initialize the application.</p>
          <p style="color: #999; font-size: 0.9rem; margin-bottom: 1rem;">${err.message}</p>
          <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Try Again
          </button>
        </div>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', init);

// Simple notification system
window.notify = function(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
    color: white;
    border-radius: 8px;
    z-index: 1000;
    font-family: system-ui;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Make functions globally accessible
window.renderNavbar = renderNavbar;
