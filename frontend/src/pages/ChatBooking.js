export function ChatBooking() {
  // We'll manage chat state internally with purely functional render logic, but since it's vanilla, we'll attach an init script after rendering.
  
  // Get user name with fallback
  const userName = window.appState.user?.name?.split(' ')[0] || 'there';
  
  setTimeout(initChatLogic, 0); // Defer execution until after the DOM renders

  return `
    <div class="container page-transition" style="padding-top: 2rem; max-width: 800px;">
      <div class="glass-card flex flex-column" style="height: 75vh; padding: 0; overflow: hidden; border: 1px solid var(--primary-glow);">
        
        <!-- Chat Header -->
        <div style="padding: 1.5rem; border-bottom: 1px solid var(--glass-border); background: rgba(16, 185, 129, 0.05); display: flex; align-items: center; justify-content: space-between;">
          <div class="flex align-center gap-3">
            <div style="width: 45px; height: 45px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-glow);">
              <i class="ph-bold ph-robot" style="color: white; font-size: 1.5rem;"></i>
            </div>
            <div>
              <h3 class="font-heading">SyncBot</h3>
              <p class="text-xs text-primary flex align-center gap-1">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--success); display: inline-block;"></span> Online
              </p>
            </div>
          </div>
          <div class="flex align-center gap-2">
            <button class="btn btn-outline btn-sm" onclick="window.showReportBlockModal()" title="Report or Block">
              <i class="ph-bold ph-shield-warning"></i> Report/Block
            </button>
            <div class="badge badge-primary">AI Booking Assistant</div>
          </div>
        </div>

        <!-- Chat History -->
        <div id="chat-history" style="flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Initial Bot Message -->
          <div class="flex gap-3" style="align-self: flex-start; max-width: 80%;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="ph-bold ph-robot text-sm" style="color: white;"></i>
            </div>
            <div style="background: var(--bg-card); border: 1px solid var(--glass-border); padding: 1rem; border-radius: 0 16px 16px 16px;">
              <p class="mb-2">Hey ${userName}! 👋 Ready to play? What sport are you looking to book a slot for?</p>
              <div class="flex gap-2 flex-wrap mt-3" id="quick-replies-1">
                <button class="btn btn-outline btn-sm quick-reply" data-val="Football" style="padding: 0.5rem 1rem; font-size: 0.875rem;">⚽ Football</button>
                <button class="btn btn-outline btn-sm quick-reply" data-val="Tennis" style="padding: 0.5rem 1rem; font-size: 0.875rem;">🎾 Tennis</button>
                <button class="btn btn-outline btn-sm quick-reply" data-val="Basketball" style="padding: 0.5rem 1rem; font-size: 0.875rem;">🏀 Basketball</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div style="padding: 1.5rem; border-top: 1px solid var(--glass-border); background: var(--bg-dark);">
          <form id="chat-form" class="flex gap-3 relative">
            <input type="text" id="chat-input" class="input-field" placeholder="Type your message..." style="padding-right: 3rem; background: var(--bg-card);">
            <button type="submit" class="btn btn-primary" style="padding: 0.875rem; border-radius: 50%; aspect-ratio: 1/1;">
              <i class="ph-bold ph-paper-plane-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function initChatLogic() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const history = document.getElementById('chat-history');
  
  let step = 1; // 1: Topic, 2: Location/Ground, 3: Date/Time, 4: Confirmation

  const appendUserMessage = (text) => {
    const msg = document.createElement('div');
    msg.className = 'flex gap-3';
    msg.style.alignSelf = 'flex-end';
    msg.style.maxWidth = '80%';
    msg.innerHTML = `
      <div style="background: var(--primary); border: 1px solid var(--primary-glow); padding: 1rem; border-radius: 16px 0 16px 16px; box-shadow: var(--shadow-glow);">
        <p style="color: white;">${text}</p>
      </div>
    `;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
  };

  const appendBotMessage = (text, htmlNodes = '') => {
    const msg = document.createElement('div');
    msg.className = 'flex gap-3';
    msg.style.alignSelf = 'flex-start';
    msg.style.maxWidth = '80%';
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(10px)';
    msg.style.transition = 'all 0.3s ease';
    
    msg.innerHTML = `
      <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="ph-bold ph-robot text-sm" style="color: white;"></i>
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--glass-border); padding: 1rem; border-radius: 0 16px 16px 16px;">
        <p>${text}</p>
        ${htmlNodes}
      </div>
    `;
    
    history.appendChild(msg);
    
    // Animate in
    requestAnimationFrame(() => {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
      history.scrollTop = history.scrollHeight;
    });
  };

  // Handle Quick Replies
  history.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply')) {
      const val = e.target.getAttribute('data-val');
      // Hide quick replies container
      e.target.parentNode.style.display = 'none';
      handleUserInput(val);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    
    // Hide any quick replies visible
    const visibleQr = document.querySelector('.quick-reply:visible');
    if (visibleQr && visibleQr.parentNode) visibleQr.parentNode.style.display = 'none';

    handleUserInput(val);
  });

  function handleUserInput(val) {
    appendUserMessage(val);
    
    // Bot typing indicator placeholder delay
    setTimeout(() => {
      if (step === 1) {
        window.appState.bookingCache = { sport: val };
        appendBotMessage(`Awesome! ${val} is a great choice. I found 3 popular grounds nearby. Which one do you prefer?`, `
          <div class="flex flex-column gap-2 mt-3">
             <button class="btn btn-outline quick-reply text-left w-full" data-val="Downtown Arena" style="justify-content: flex-start;"><i class="ph-bold ph-map-pin"></i> Downtown Arena (2km)</button>
             <button class="btn btn-outline quick-reply text-left w-full" data-val="Westside Pitch" style="justify-content: flex-start;"><i class="ph-bold ph-map-pin"></i> Westside Pitch (4.5km)</button>
             <button class="btn btn-outline quick-reply text-left w-full" data-val="Elite Sports Club" style="justify-content: flex-start;"><i class="ph-bold ph-map-pin"></i> Elite Sports Club (6km)</button>
          </div>
        `);
        step++;
      } else if (step === 2) {
        window.appState.bookingCache.ground = val;
        appendBotMessage(`Great, ${val} it is. When would you like to play?`, `
          <div class="flex gap-2 flex-wrap mt-3">
             <button class="btn btn-outline btn-sm quick-reply" data-val="Today, 6:00 PM">Today evening</button>
             <button class="btn btn-outline btn-sm quick-reply" data-val="Tomorrow, 7:00 AM">Tomorrow morning</button>
             <button class="btn btn-outline btn-sm quick-reply" data-val="This Weekend">This weekend</button>
          </div>
        `);
        step++;
      } else if (step === 3) {
        window.appState.bookingCache.time = val;
        const b = window.appState.bookingCache;
        appendBotMessage(`Almost done! Let's confirm your booking:<br/><br/><b>Sport:</b> ${b.sport}<br/><b>Ground:</b> ${b.ground}<br/><b>Time:</b> ${b.time}<br/><br/>Should I go ahead and confirm this slot?`, `
          <div class="flex gap-2 mt-3">
             <button class="btn btn-primary btn-sm quick-reply" data-val="Yes, confirm booking">Confirm & Pay</button>
             <button class="btn btn-ghost btn-sm quick-reply" data-val="Cancel">Cancel</button>
          </div>
        `);
        step++;
      } else if (step === 4) {
        if (val.toLowerCase().includes('cancel')) {
          appendBotMessage('Booking cancelled. Let me know when you want to try again!');
          step = 1;
        } else {
          appendBotMessage(`<i class="ph-bold ph-spinner animate-spin"></i> Processing your booking...`);
          
          // API Call to Backend
          const b = window.appState.bookingCache;
          fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sport: b.sport, ground: b.ground, time: b.time })
          })
          .then(res => res.json())
          .then(data => {
            appendBotMessage(`🎉 Booking confirmed! Your slot is booked at ${b.ground}. I've sent the details to your dashboard. Have a great game!`);
            window.notify('Slot Successfully Booked!', 'success');
             // Reset after a while
            setTimeout(() => { step = 1; }, 5000);
          })
          .catch(err => {
             console.error(err);
             appendBotMessage('Sorry, there was an error processing your booking. Is the backend running?');
             step = 1;
          });
        }
      }
    }, 600);
  }
}
