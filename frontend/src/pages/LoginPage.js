import { API_ENDPOINTS } from '../config/api.js';

export function LoginPage() {
  setTimeout(() => {
    initLoginLogic();
  }, 0);
  
  const navigateTo = (url) => {
    history.pushState(null, null, url);
    window.location.reload();
  };
  
  window.loginNavigateTo = navigateTo;
  
  return `
    <div class="container page-transition" style="padding-top: 4rem; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-dark);">
      <div class="glass-card" style="max-width: 500px; width: 100%; padding: 2.5rem;">
        <div class="text-center mb-6">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; box-shadow: var(--shadow-glow);">
            <i class="ph-duotone ph-volleyball" style="font-size: 2.5rem; color: white;"></i>
          </div>
          <h2 class="text-3xl font-heading mb-2">Welcome Back</h2>
          <p class="text-muted">Sign in to continue to SportsSync</p>
        </div>
        
        <form id="login-form" class="flex flex-column gap-4">
          <div>
            <label class="text-sm font-medium mb-2" style="display: block;">Email</label>
            <input type="email" id="login-email" class="input-field" placeholder="user@sportssync.com" required>
          </div>
          
          <div>
            <label class="text-sm font-medium mb-2" style="display: block;">Password</label>
            <input type="password" id="login-password" class="input-field" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn btn-primary w-full" style="padding: 1rem; margin-top: 1rem;">
            <i class="ph-bold ph-sign-in"></i> Sign In
          </button>
        </form>
        
        <div class="text-center mt-6">
          <p class="text-sm text-muted" style="background: transparent; padding: 1rem; border-radius: 12px; border: 1px solid var(--glass-border);">
            <strong class="text-primary">Demo Credentials</strong><br>
            User: user@sportssync.com / user123<br>
            Trainer: trainer@sportssync.com / trainer123<br>
            Admin: admin@sportssync.com / admin123
          </p>
        </div>
      </div>
    </div>
  `;
}

function initLoginLogic() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    window.notify('Authenticating...', 'info');
    
    try {
      // Try backend authentication
      const res = await fetch(`${API_ENDPOINTS.auth}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        const data = await res.json();
        window.appState.user = data.user;
        localStorage.setItem('sportssync_user', JSON.stringify(window.appState.user));
        window.notify(`Welcome back, ${data.user.name}!`, 'success');
        
        // Redirect based on role
        if (data.user.type === 'trainer') {
          window.loginNavigateTo('/trainer');
        } else if (data.user.type === 'admin') {
          window.loginNavigateTo('/admin');
        } else {
          window.loginNavigateTo('/profile');
        }
        return;
      }
    } catch (err) {
      console.warn('Backend auth unreachable, trying local fallback:', err);
    }
    
    // Local Fallback (Improved to handle all roles)
    let user = null;
    if (email === 'user@sportssync.com' && password === 'user123') {
      user = { id: '1', name: 'Alex Hunter', type: 'user', email, avatar: 'https://i.pravatar.cc/150?u=1', stats: { gamesPlayed: 24, winRate: '68%', hoursPlayed: '42h', connections: 15 } };
    } else if (email === 'trainer@sportssync.com' && password === 'trainer123') {
      user = { id: 't1', name: 'Rahul Sharma', type: 'trainer', email, avatar: 'https://i.pravatar.cc/150?u=rahul', sport: 'cricket', stats: { totalSessions: 156, rating: 4.9, students: 42, experience: '15 years' } };
    } else if (email === 'admin@sportssync.com' && password === 'admin123') {
      user = { id: '0', name: 'Admin User', type: 'admin', email, avatar: 'https://i.pravatar.cc/150?u=admin' };
    }

    if (user) {
      window.appState.user = user;
      localStorage.setItem('sportssync_user', JSON.stringify(user));
      window.notify(`Welcome back, ${user.name} (Offline Mode)!`, 'success');
      
      const target = user.type === 'trainer' ? '/trainer' : user.type === 'admin' ? '/admin' : '/profile';
      window.loginNavigateTo(target);
    } else {
      window.notify('Invalid credentials', 'error');
    }
  });
}
