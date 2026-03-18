export function LoginPage() {
  // Show login page first - user will enter credentials and then navigate to dashboard
  
  setTimeout(() => {
    initLoginLogic();
  }, 0);
  
  const navigateTo = (url) => {
    history.pushState(null, null, url);
    window.location.reload();
  };
  
  // Store navigateTo for use in initLoginLogic
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
            <label class="text-sm font-medium mb-2" style="display: block;">Login as</label>
            <div class="flex gap-2">
              <button type="button" class="login-type-btn btn btn-outline flex-1 active" data-type="user">
                <i class="ph-bold ph-user"></i> User
              </button>
              <button type="button" class="login-type-btn btn btn-outline flex-1" data-type="trainer">
                <i class="ph-bold ph-chalkboard-teacher"></i> Trainer
              </button>
              <button type="button" class="login-type-btn btn btn-outline flex-1" data-type="admin">
                <i class="ph-bold ph-shield-check"></i> Admin
              </button>
            </div>
          </div>
          
          <div>
            <label class="text-sm font-medium mb-2" style="display: block;">Email</label>
            <input type="email" id="login-email" class="input-field" placeholder="Enter your email" required>
          </div>
          
          <div>
            <label class="text-sm font-medium mb-2" style="display: block;">Password</label>
            <input type="password" id="login-password" class="input-field" placeholder="Enter your password" required>
          </div>
          
          <button type="submit" class="btn btn-primary w-full" style="padding: 1rem; margin-top: 1rem;">
            <i class="ph-bold ph-sign-in"></i> Sign In
          </button>
        </form>
        
        <div class="text-center mt-6">
          <p class="text-sm text-muted">
            Demo credentials:<br>
            <span class="text-primary">User: user@sportssync.com / user123</span><br>
            <span class="text-warning">Trainer: trainer@sportssync.com / trainer123</span><br>
            <span class="text-accent">Admin: admin@sportssync.com / admin123</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

function initLoginLogic() {
  const typeBtns = document.querySelectorAll('.login-type-btn');
  let selectedType = 'user';
  
  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.remove('btn-outline');
      btn.classList.add('active', 'btn-primary');
      selectedType = btn.getAttribute('data-type');
    });
  });
  
  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (selectedType === 'user') {
      if (email === 'user@sportssync.com' && password === 'user123') {
        window.appState.user = {
          id: '1',
          name: 'Alex Hunter',
          type: 'user',
          email: email,
          avatar: 'https://i.pravatar.cc/150?u=1',
          location: { lat: 40.7128, lng: -74.0060 },
          stats: { gamesPlayed: 24, winRate: '68%', hoursPlayed: '42h', connections: 15 }
        };
        localStorage.setItem('sportssync_user', JSON.stringify(window.appState.user));
        window.notify('Welcome back, Alex!', 'success');
        window.loginNavigateTo('/profile');
      } else {
        window.notify('Invalid user credentials', 'error');
      }
    } else if (selectedType === 'trainer') {
      if (email === 'trainer@sportssync.com' && password === 'trainer123') {
        window.appState.user = {
          id: 't1',
          name: 'Rahul Sharma',
          type: 'trainer',
          email: email,
          avatar: 'https://i.pravatar.cc/150?u=rahul',
          sport: 'cricket',
          stats: { totalSessions: 156, rating: 4.9, students: 42, experience: '15 years' }
        };
        localStorage.setItem('sportssync_user', JSON.stringify(window.appState.user));
        window.notify('Welcome back, Rahul!', 'success');
        window.loginNavigateTo('/profile');
      } else {
        window.notify('Invalid trainer credentials', 'error');
      }
    } else if (selectedType === 'admin') {
      if (email === 'admin@sportssync.com' && password === 'admin123') {
        window.appState.user = {
          id: '0',
          name: 'Admin User',
          type: 'admin',
          email: email,
          avatar: 'https://i.pravatar.cc/150?u=admin'
        };
        localStorage.setItem('sportssync_user', JSON.stringify(window.appState.user));
        window.notify('Welcome back, Admin!', 'success');
        window.loginNavigateTo('/profile');
      } else {
        window.notify('Invalid admin credentials', 'error');
      }
    }
  });
}
