export class NotificationManager {
  static container() {
    let container = document.getElementById('notification-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Show a notification toast
   * @param {string} message - Message to display
   * @param {string} type - 'success', 'error', 'info', 'warning'
   */
  static show(message, type = 'info') {
    const toast = document.createElement('div');
    
    // Core styling based on type
    let bgColor = 'var(--glass-bg)';
    let borderColor = 'var(--glass-border)';
    let icon = 'ph-info';
    let iconColor = 'var(--accent)';

    if (type === 'success') {
      borderColor = 'var(--primary)';
      iconColor = 'var(--primary)';
      icon = 'ph-check-circle';
    } else if (type === 'error') {
      borderColor = 'var(--danger)';
      iconColor = 'var(--danger)';
      icon = 'ph-x-circle';
    } else if (type === 'warning') {
      borderColor = 'var(--warning)';
      iconColor = 'var(--warning)';
      icon = 'ph-warning';
    }

    toast.className = 'glass-card';
    toast.style.padding = '1rem 1.5rem';
    toast.style.borderLeft = `4px solid ${borderColor}`;
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '1rem';
    toast.style.minWidth = '300px';
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    toast.innerHTML = `
      <i class="ph-fill ${icon}" style="color: ${iconColor}; font-size: 1.5rem;"></i>
      <span class="font-medium">${message}</span>
    `;

    const container = this.container();
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });

    // Remove after 3.5 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 3500);
  }
}

// Attach globally for easy access
window.notify = NotificationManager.show.bind(NotificationManager);
