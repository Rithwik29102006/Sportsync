// Simplified main.js for debugging

console.log('🚀 SportsSync loading...');

// Basic error handling
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

// Simple test function
function testBasicFunctionality() {
  console.log('✅ Testing basic functionality...');
  const appContainer = document.getElementById('main-content');
  if (appContainer) {
    appContainer.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #007bff; margin-bottom: 1rem;">✅ SportsSync is Working!</h1>
        <p style="color: #666; margin-bottom: 2rem;">Basic functionality test passed. The app can load and render content.</p>
        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
          <h3 style="margin-bottom: 0.5rem;">🔍 Debugging Info:</h3>
          <p style="font-size: 0.9rem; color: #666;">✅ HTML loaded<br>✅ JavaScript executed<br>✅ DOM manipulation working</p>
        </div>
        <button onclick="loadFullApp()" style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Load Full Application
        </button>
      </div>
    `;
    return true;
  } else {
    console.error('❌ App container not found');
    return false;
  }
}

// Load full app function
window.loadFullApp = function() {
  console.log('🔄 Loading full application...');
  // This will be replaced with the actual app loading logic
  const appContainer = document.getElementById('main-content');
  if (appContainer) {
    appContainer.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui;">
        <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
        <p style="color: #666;">Loading full application...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  }
  
  // Try to load the full app
  setTimeout(() => {
    console.log('Full app loading would happen here...');
    showError('Full app loading temporarily disabled for debugging. Please check console for more info.');
  }, 1000);
};

function showError(message) {
  const appContainer = document.getElementById('main-content');
  if (appContainer) {
    appContainer.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: system-ui; max-width: 600px; margin: 0 auto;">
        <h3 style="color: #dc3545; margin-bottom: 1rem;">❌ Loading Error</h3>
        <p style="color: #666;">${message}</p>
        <button onclick="testBasicFunctionality()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Back to Test
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testBasicFunctionality);
} else {
  testBasicFunctionality();
}
