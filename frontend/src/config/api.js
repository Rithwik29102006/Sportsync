// Try production URL first, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  'https://sportsync-production-afb3.up.railway.app:8080' || 
  'http://localhost:8080';

export const API_ENDPOINTS = {
  grounds: `${API_BASE_URL}/api/grounds`,
  slots: `${API_BASE_URL}/api/slots`,
  bookSlot: `${API_BASE_URL}/api/slots/book`,
  chat: `${API_BASE_URL}/api/chat`,
  users: `${API_BASE_URL}/api/users`,
  admin: `${API_BASE_URL}/api/admin`
};

export default API_BASE_URL;

// Test API connectivity
export async function testApiConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { 
      method: 'GET',
      timeout: 5000 
    });
    return response.ok;
  } catch (error) {
    console.warn('API connection test failed:', error);
    return false;
  }
}
