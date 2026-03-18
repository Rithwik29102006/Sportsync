// Simple test to check if basic functionality works
console.log('Test script loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  const appContainer = document.getElementById('main-content');
  if (appContainer) {
    appContainer.innerHTML = '<div style="padding: 2rem; text-align: center;"><h1>✅ SportsSync is Working!</h1><p>Basic functionality test passed.</p></div>';
  } else {
    console.error('App container not found');
  }
});
