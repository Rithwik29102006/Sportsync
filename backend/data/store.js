// In-memory simplistic database

export const store = {
  // User authentication (demo users)
  users: [
    { id: '1', name: 'Alex Hunter', email: 'user@sportssync.com', password: 'user123', type: 'user', avatar: 'https://i.pravatar.cc/150?u=1', location: { lat: 40.7128, lng: -74.0060 }, stats: { gamesPlayed: 24, winRate: '68%', hoursPlayed: '42h', connections: 15 } },
    { id: 't1', name: 'Rahul Sharma', email: 'trainer@sportssync.com', password: 'trainer123', type: 'trainer', avatar: 'https://i.pravatar.cc/150?u=rahul', sport: 'cricket', stats: { totalSessions: 156, rating: 4.9, students: 42, experience: '15 years' } },
    { id: '0', name: 'Admin User', email: 'admin@sportssync.com', password: 'admin123', type: 'admin', avatar: 'https://i.pravatar.cc/150?u=admin' }
  ],
  
  currentUser: null,
  
  // Current logged in user
  user: {
    id: '1',
    name: 'Alex Hunter',
    type: 'player',
    avatar: 'https://i.pravatar.cc/150?u=1',
    stats: {
      gamesPlayed: 24,
      winRate: '68%',
      hoursPlayed: '42h',
      connections: 15
    }
  },
  
  activities: [
    { id: 'a1', title: 'Football Match at Central Park', date: 'Today, 5:00 PM', status: 'Upcoming' },
    { id: 'a2', title: 'Tennis Singles at City Club', date: 'Yesterday, 8:00 AM', status: 'Completed' },
    { id: 'a3', title: 'Basketball 3v3', date: 'Oct 12, 6:00 PM', status: 'Completed' }
  ],

  adminStats: {
    totalUsers: 12450,
    activeBookings: 342,
    revenueToday: 4200
  },

  // Sports grounds
  grounds: [
    { id: 'g1', name: 'Mumbai Football Arena', sport: 'Football', address: 'Marine Drive, Mumbai Central', lat: 18.9438, lng: 72.8234, activeBookings: 3, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&q=80', rating: 4.5, price: 1500 },
    { id: 'g2', name: 'Andheri Cricket Club', sport: 'Cricket', address: 'Andheri West, Mumbai', lat: 19.1363, lng: 72.8462, activeBookings: 1, image: 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=100&q=80', rating: 4.2, price: 2000 },
    { id: 'g3', name: 'Delhi Sports Complex', sport: 'Tennis', address: 'Nehru Place, New Delhi', lat: 28.5541, lng: 77.2531, activeBookings: 5, image: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=100&q=80', rating: 4.8, price: 800 },
    { id: 'g4', name: 'Dwarka Basketball Court', sport: 'Basketball', address: 'Dwarka Sector 12, Delhi', lat: 28.5921, lng: 77.0315, activeBookings: 2, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&q=80', rating: 4.6, price: 1200 },
    { id: 'g5', name: 'Bangalore Badminton Hub', sport: 'Badminton', address: 'Whitefield, Bangalore', lat: 12.9698, lng: 77.7499, activeBookings: 8, image: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=100&q=80', rating: 4.9, price: 600 },
    { id: 'g6', name: 'Chennai Cricket Ground', sport: 'Cricket', address: 'Chepauk, Chennai', lat: 13.0625, lng: 80.2790, activeBookings: 4, image: 'https://images.unsplash.com/photo-1531415074968-b074b837a6b3?w=100&q=80', rating: 4.7, price: 2500 },
    { id: 'g7', name: 'Kolkata Eden Gardens', sport: 'Cricket', address: 'Eden Gardens, Kolkata', lat: 22.5646, lng: 88.3426, activeBookings: 6, image: 'https://images.unsplash.com/photo-1531415074968-bc7d597bf5a9?w=100&q=80', rating: 4.9, price: 3000 },
    { id: 'g8', name: 'Hyderabad Gachibowli Stadium', sport: 'Football', address: 'Gachibowli, Hyderabad', lat: 17.4401, lng: 78.3427, activeBookings: 3, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&q=80', rating: 4.4, price: 1800 },
    { id: 'g9', name: 'Pune Balewadi Sports Complex', sport: 'Multiple', address: 'Balewadi, Pune', lat: 18.5298, lng: 73.8075, activeBookings: 7, image: 'https://images.unsplash.com/photo-1461896836934- voices-4f1d5ca3e?w=100&q=80', rating: 4.6, price: 2200 },
    { id: 'g10', name: 'Jaipur Cricket Academy', sport: 'Cricket', address: 'Vaishali Nagar, Jaipur', lat: 26.9124, lng: 75.7873, activeBookings: 2, image: 'https://images.unsplash.com/photo-1531415074968-b074b837a6b3?w=100&q=80', rating: 4.3, price: 1600 },
    { id: 'g11', name: 'Ahmedabad Sports Arena', sport: 'Football', address: 'SG Highway, Ahmedabad', lat: 23.0225, lng: 72.5714, activeBookings: 4, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&q=80', rating: 4.5, price: 1400 },
    { id: 'g12', name: 'Goa Beach Volleyball Court', sport: 'Volleyball', address: 'Baga Beach, Goa', lat: 15.5527, lng: 73.7535, activeBookings: 5, image: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be1?w=100&q=80', rating: 4.8, price: 1000 }
  ],

  // Slot bookings
  slots: [
    { id: 's1', groundId: 'g1', sport: 'Football', date: '2026-03-15', time: '09:00', price: 1500, available: true },
    { id: 's2', groundId: 'g1', sport: 'Football', date: '2026-03-15', time: '11:00', price: 1500, available: true },
    { id: 's3', groundId: 'g1', sport: 'Football', date: '2026-03-15', time: '14:00', price: 1500, available: false },
    { id: 's4', groundId: 'g2', sport: 'Cricket', date: '2026-03-15', time: '08:00', price: 2000, available: true },
    { id: 's5', groundId: 'g2', sport: 'Cricket', date: '2026-03-15', time: '10:00', price: 2000, available: true },
    { id: 's6', groundId: 'g3', sport: 'Tennis', date: '2026-03-15', time: '09:00', price: 800, available: true },
    { id: 's7', groundId: 'g3', sport: 'Tennis', date: '2026-03-15', time: '11:00', price: 800, available: false },
    { id: 's8', groundId: 'g4', sport: 'Basketball', date: '2026-03-15', time: '07:00', price: 1200, available: true },
    { id: 's9', groundId: 'g4', sport: 'Basketball', date: '2026-03-15', time: '15:00', price: 1200, available: true },
    { id: 's10', groundId: 'g5', sport: 'Badminton', date: '2026-03-15', time: '06:00', price: 600, available: true },
    { id: 's11', groundId: 'g6', sport: 'Cricket', date: '2026-03-15', time: '08:00', price: 2500, available: true },
    { id: 's12', groundId: 'g7', sport: 'Cricket', date: '2026-03-15', time: '09:00', price: 3000, available: false },
    { id: 's13', groundId: 'g8', sport: 'Football', date: '2026-03-15', time: '07:00', price: 1800, available: true },
    { id: 's14', groundId: 'g9', sport: 'Multiple', date: '2026-03-15', time: '10:00', price: 2200, available: true },
    { id: 's15', groundId: 'g10', sport: 'Cricket', date: '2026-03-15', time: '06:00', price: 1600, available: true },
    { id: 's16', groundId: 'g11', sport: 'Football', date: '2026-03-15', time: '08:00', price: 1400, available: true },
    { id: 's17', groundId: 'g12', sport: 'Volleyball', date: '2026-03-15', time: '05:00', price: 1000, available: true }
  ],

  // Games/Sports
  games: [
    { id: 'game1', name: 'Football', icon: '⚽', description: 'Team sport played with a spherical ball', popularity: 95 },
    { id: 'game2', name: 'Tennis', icon: '🎾', description: 'Racket sport played on a rectangular court', popularity: 88 },
    { id: 'game3', name: 'Basketball', icon: '🏀', description: 'Team sport played on a rectangular court', popularity: 92 },
    { id: 'game4', name: 'Cricket', icon: '🏏', description: 'Team sport played with a bat and ball', popularity: 85 },
    { id: 'game5', name: 'Badminton', icon: '🏸', description: 'Racket sport played with shuttlecock', popularity: 80 },
    { id: 'game6', name: 'Volleyball', icon: '🏐', description: 'Team sport played on a rectangular court', popularity: 78 }
  ],

  // Friends/Players
  friends: [
    { id: 'f1', name: 'Jordan Smith', sport: 'Football', level: 'Intermediate', distance: '0.5 km', avatar: 'https://i.pravatar.cc/150?u=jordan', status: 'online' },
    { id: 'f2', name: 'Sam Wilson', sport: 'Tennis', level: 'Advanced', distance: '1.2 km', avatar: 'https://i.pravatar.cc/150?u=sam', status: 'online' },
    { id: 'f3', name: 'Casey Brown', sport: 'Basketball', level: 'Beginner', distance: '2.0 km', avatar: 'https://i.pravatar.cc/150?u=casey', status: 'offline' },
    { id: 'f4', name: 'Riley Johnson', sport: 'Cricket', level: 'Intermediate', distance: '3.5 km', avatar: 'https://i.pravatar.cc/150?u=riley', status: 'online' },
    { id: 'f5', name: 'Alex Chen', sport: 'Football', level: 'Advanced', distance: '1.8 km', avatar: 'https://i.pravatar.cc/150?u=alexc', status: 'online' },
    { id: 'f6', name: 'Morgan Lee', sport: 'Tennis', level: 'Beginner', distance: '0.8 km', avatar: 'https://i.pravatar.cc/150?u=morgan', status: 'offline' }
  ],

  // Tutorials
  tutorials: [
    { id: 'tut1', sport: 'Football', title: 'Basic Dribbling Techniques', difficulty: 'Beginner', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&q=80' },
    { id: 'tut2', sport: 'Football', title: 'Passing Fundamentals', difficulty: 'Beginner', duration: '12 min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&q=80' },
    { id: 'tut3', sport: 'Tennis', title: 'Forehand Grip & Swing', difficulty: 'Beginner', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1622279457486-69d73ce187ef?w=100&q=80' },
    { id: 'tut4', sport: 'Basketball', title: 'Shooting Basics', difficulty: 'Beginner', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&q=80' },
    { id: 'tut5', sport: 'Cricket', title: 'Batting Stance', difficulty: 'Beginner', duration: '10 min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1531415074968-b074b837a6b3?w=100&q=80' },
    { id: 'tut6', sport: 'Badminton', title: 'Service Techniques', difficulty: 'Intermediate', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1617083934555-563404543793?w=100&q=80' }
  ],

  // Trainer students
  students: [
    { id: 'st1', name: 'Arjun Patel', sport: 'Cricket', level: 'Intermediate', sessions: 12, progress: 75, avatar: 'https://i.pravatar.cc/150?u=arjun', phone: '9876543210' },
    { id: 'st2', name: 'Karthik Nair', sport: 'Cricket', level: 'Beginner', sessions: 8, progress: 40, avatar: 'https://i.pravatar.cc/150?u=karthik', phone: '9876543211' },
    { id: 'st3', name: 'Vikram Singh', sport: 'Cricket', level: 'Advanced', sessions: 20, progress: 90, avatar: 'https://i.pravatar.cc/150?u=vikram', phone: '9876543212' },
    { id: 'st4', name: 'Prakash Reddy', sport: 'Cricket', level: 'Intermediate', sessions: 15, progress: 60, avatar: 'https://i.pravatar.cc/150?u=prakash', phone: '9876543213' }
  ],

  // Trainer payments
  payments: [
    { id: 'pay1', studentId: 'st1', studentName: 'Arjun Patel', amount: 1500, date: '2026-03-10', status: 'Completed', method: 'UPI' },
    { id: 'pay2', studentId: 'st2', studentName: 'Karthik Nair', amount: 1200, date: '2026-03-08', status: 'Completed', method: 'Card' },
    { id: 'pay3', studentId: 'st3', studentName: 'Vikram Singh', amount: 2000, date: '2026-03-12', status: 'Pending', method: 'UPI' },
    { id: 'pay4', studentId: 'st4', studentName: 'Prakash Reddy', amount: 1800, date: '2026-03-05', status: 'Completed', method: 'Cash' }
  ],

  // Trainer timetable
  timetable: [
    { id: 'tt1', day: 'Monday', time: '06:00 - 07:00', student: 'Arjun Patel', sport: 'Cricket', location: 'Riverside Ground', studentId: 'st1' },
    { id: 'tt2', day: 'Monday', time: '07:00 - 08:00', student: 'Karthik Nair', sport: 'Cricket', location: 'Riverside Ground', studentId: 'st2' },
    { id: 'tt3', day: 'Tuesday', time: '06:00 - 07:00', student: 'Vikram Singh', sport: 'Cricket', location: 'Riverside Ground', studentId: 'st3' },
    { id: 'tt4', day: 'Wednesday', time: '06:00 - 07:00', student: 'Prakash Reddy', sport: 'Cricket', location: 'Riverside Ground', studentId: 'st4' },
    { id: 'tt5', day: 'Thursday', time: '06:00 - 07:00', student: 'Arjun Patel', sport: 'Cricket', location: 'Riverside Ground', studentId: 'st1' },
    { id: 'tt6', day: 'Friday', time: '07:00 - 08:00', student: 'Karthik Nair', sport: 'Cricket', location: 'Riverside Ground', studentId: 'st2' },
    { id: 'tt7', day: 'Saturday', time: '08:00 - 10:00', student: 'Group Session', sport: 'Cricket', location: 'Riverside Ground', studentId: null }
  ],

  // Reports/Blocks
  reports: [
    { id: 'rep1', reporterId: '1', reportedId: 'f3', reason: 'Inappropriate behavior', status: 'Pending', date: '2026-03-10' },
    { id: 'rep2', reporterId: '1', reportedId: 'f5', reason: 'No-show', status: 'Resolved', date: '2026-03-05' }
  ],

  // Chat messages
  messages: [
    { id: 'm1', from: 'AI Assistant', text: 'Hello! How can I help you book a slot today?', timestamp: new Date().toISOString() }
  ],

  // History of notifications sent
  notifications: []
};
