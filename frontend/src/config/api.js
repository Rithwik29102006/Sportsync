const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sportsync-production-afb3.up.railway.app:8080';

export const API_ENDPOINTS = {
  grounds: `${API_BASE_URL}/api/grounds`,
  slots: `${API_BASE_URL}/api/slots`,
  bookSlot: `${API_BASE_URL}/api/slots/book`,
  chat: `${API_BASE_URL}/api/chat`,
  users: `${API_BASE_URL}/api/users`,
  admin: `${API_BASE_URL}/api/admin`
};

export default API_BASE_URL;
