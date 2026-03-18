export function Home() {
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
            <a href="/slots" data-link class="btn btn-primary" style="padding: 1rem 2rem; font-size: 1.125rem;">
              <i class="ph-bold ph-calendar-plus"></i> Book a Slot
            </a>
            <a href="/map" data-link class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.125rem;">
              <i class="ph-bold ph-map-trifold"></i> Find Grounds
            </a>
            <a href="/learn" data-link class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.125rem;">
              <i class="ph-bold ph-graduation-cap"></i> Learn
            </a>
            <a href="/login" data-link class="btn btn-outline" style="padding: 1rem 2rem; font-size: 1.125rem;">
              <i class="ph-bold ph-sign-in"></i> Login
            </a>
          </div>
        </div>

        <!-- Hero Image/Graphic -->
        <div style="flex: 1; min-width: 300px; position: relative; display: flex; justify-content: center;">
          <div style="position: absolute; top: 10%; left: 10%; width: 80%; height: 80%; background: var(--primary-glow); filter: blur(80px); border-radius: 50%;"></div>
          <div class="glass-card flex align-center justify-center flex-column gap-6" style="width: 100%; max-width: 400px; position: relative; z-index: 1;">
            <i class="ph-duotone ph-trophy text-primary" style="font-size: 6rem;"></i>
            <h3 class="text-2xl text-center">Join 50,000+ Players</h3>
            <div class="flex justify-center" style="margin-left: -10px;">
              <img src="https://i.pravatar.cc/150?u=a" alt="User" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--bg-dark); margin-left: -10px;">
              <img src="https://i.pravatar.cc/150?u=b" alt="User" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--bg-dark); margin-left: -10px;">
              <img src="https://i.pravatar.cc/150?u=c" alt="User" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--bg-dark); margin-left: -10px;">
              <img src="https://i.pravatar.cc/150?u=d" alt="User" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid var(--bg-dark); margin-left: -10px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--glass-bg); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; border: 2px solid var(--bg-dark); margin-left: -10px;">+1k</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section style="margin-top: 8rem;">
        <h2 class="text-3xl font-heading text-center mb-12">Platform <span class="text-gradient">Features</span></h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <!-- Feature 1 -->
          <div class="glass-card" style="padding: 2.5rem;">
            <div style="width: 60px; height: 60px; border-radius: 12px; background: rgba(99, 102, 241, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              <i class="ph-duotone ph-calendar-check" style="font-size: 2rem; color: var(--accent);"></i>
            </div>
            <h3 class="text-xl mb-2">Slot Booking</h3>
            <p class="text-muted">Book your preferred time slots at nearby sports grounds with real-time availability.</p>
          </div>

          <!-- Feature 2 -->
          <div class="glass-card" style="padding: 2.5rem;">
            <div style="width: 60px; height: 60px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              <i class="ph-duotone ph-map-trifold" style="font-size: 2rem; color: var(--primary);"></i>
            </div>
            <h3 class="text-xl mb-2">Find Nearby Grounds</h3>
            <p class="text-muted">Discover sports grounds near your location with interactive map integration.</p>
          </div>

          <!-- Feature 3 -->
          <div class="glass-card" style="padding: 2.5rem;">
            <div style="width: 60px; height: 60px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              <i class="ph-duotone ph-users-three" style="font-size: 2rem; color: var(--warning);"></i>
            </div>
            <h3 class="text-xl mb-2">Find Playing Partners</h3>
            <p class="text-muted">Connect with players of similar skill levels locally and organize games.</p>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section style="margin-top: 8rem;">
        <h2 class="text-3xl font-heading text-center mb-12">Get <span class="text-gradient">Started</span></h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          <a href="/slots" data-link class="glass-card flex align-center gap-4" style="padding: 1.5rem; cursor: pointer; text-decoration: none;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: var(--primary-glow); display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-calendar-plus text-primary text-xl"></i>
            </div>
            <div>
              <h4 class="font-medium mb-1">Book a Slot</h4>
              <p class="text-sm text-muted">Reserve your playing time</p>
            </div>
          </a>
          
          <a href="/map" data-link class="glass-card flex align-center gap-4" style="padding: 1.5rem; cursor: pointer; text-decoration: none;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: var(--accent-glow); display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-map-pin text-accent text-xl"></i>
            </div>
            <div>
              <h4 class="font-medium mb-1">Explore Grounds</h4>
              <p class="text-sm text-muted">Find grounds near you</p>
            </div>
          </a>
          
          <a href="/friends" data-link class="glass-card flex align-center gap-4" style="padding: 1.5rem; cursor: pointer; text-decoration: none;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-user-plus text-warning text-xl"></i>
            </div>
            <div>
              <h4 class="font-medium mb-1">Find Friends</h4>
              <p class="text-sm text-muted">Connect with players</p>
            </div>
          </a>
          
          <a href="/dashboard" data-link class="glass-card flex align-center gap-4" style="padding: 1.5rem; cursor: pointer; text-decoration: none;">
            <div style="width: 50px; height: 50px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); display: flex; align-items: center; justify-content: center;">
              <i class="ph-bold ph-chart-line-up text-primary text-xl"></i>
            </div>
            <div>
              <h4 class="font-medium mb-1">View Dashboard</h4>
              <p class="text-sm text-muted">Track your activity</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  `;
}
