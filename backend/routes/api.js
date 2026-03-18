import { Router } from 'express';
import { store } from '../data/store.js';

export const apiRouter = Router();

// --- Auth Routes ---
apiRouter.post('/auth/login', (req, res) => {
  const { email, password, type } = req.body;
  
  const user = store.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Check if user type matches
  if (type && user.type !== type) {
    return res.status(401).json({ error: 'Invalid user type' });
  }
  
  store.currentUser = user;
  res.json({ 
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email, type: user.type, avatar: user.avatar }
  });
});

apiRouter.post('/auth/logout', (req, res) => {
  store.currentUser = null;
  res.json({ message: 'Logged out successfully' });
});

apiRouter.get('/auth/me', (req, res) => {
  if (store.currentUser) {
    res.json(store.currentUser);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// --- User Routes ---
apiRouter.get('/user', (req, res) => {
  res.json(store.user);
});

apiRouter.get('/user/activities', (req, res) => {
  res.json(store.activities);
});

// --- Slot Routes ---
apiRouter.get('/slots', (req, res) => {
  const { sport, date } = req.query;
  let slots = [...store.slots];
  
  if (sport) {
    slots = slots.filter(s => s.sport.toLowerCase() === sport.toLowerCase());
  }
  if (date) {
    slots = slots.filter(s => s.date === date);
  }
  
  res.json(slots);
});

apiRouter.get('/slots/:id', (req, res) => {
  const slot = store.slots.find(s => s.id === req.params.id);
  if (slot) {
    res.json(slot);
  } else {
    res.status(404).json({ error: 'Slot not found' });
  }
});

apiRouter.post('/slots/book', (req, res) => {
  const { slotId, userId } = req.body;
  
  const slotIndex = store.slots.findIndex(s => s.id === slotId);
  if (slotIndex === -1) {
    return res.status(404).json({ error: 'Slot not found' });
  }
  
  if (!store.slots[slotIndex].available) {
    return res.status(400).json({ error: 'Slot not available' });
  }
  
  store.slots[slotIndex].available = false;
  
  // Create activity
  const newActivity = {
    id: `a${Date.now()}`,
    title: `${store.slots[slotIndex].sport} at ${store.grounds.find(g => g.id === store.slots[slotIndex].groundId)?.name || 'Ground'}`,
    date: `${store.slots[slotIndex].date}, ${store.slots[slotIndex].time}`,
    time: store.slots[slotIndex].time,
    status: 'Upcoming',
    price: store.slots[slotIndex].price,
    ground: store.grounds.find(g => g.id === store.slots[slotIndex].groundId)?.name,
    sport: store.slots[slotIndex].sport
  };
  
  store.activities.unshift(newActivity);
  
  res.status(201).json({ 
    message: 'Slot booked successfully',
    booking: newActivity
  });
});

// --- Ground Routes ---
apiRouter.get('/grounds', (req, res) => {
  const { sport, lat, lng } = req.query;
  let grounds = [...store.grounds];
  
  if (sport) {
    grounds = grounds.filter(g => g.sport.toLowerCase() === sport.toLowerCase() || g.sport === 'Multiple');
  }
  
  res.json(grounds);
});

apiRouter.get('/grounds/:id', (req, res) => {
  const ground = store.grounds.find(g => g.id === req.params.id);
  if (ground) {
    res.json(ground);
  } else {
    res.status(404).json({ error: 'Ground not found' });
  }
});

// --- Games Routes ---
apiRouter.get('/games', (req, res) => {
  res.json(store.games);
});

// --- Friends Routes ---
apiRouter.get('/friends', (req, res) => {
  const { sport } = req.query;
  let friends = [...store.friends];
  
  if (sport) {
    friends = friends.filter(f => f.sport.toLowerCase() === sport.toLowerCase());
  }
  
  res.json(friends);
});

apiRouter.post('/friends/add', (req, res) => {
  const { friendId } = req.body;
  
  const newFriend = {
    id: `f${Date.now()}`,
    ...store.friends.find(f => f.id === friendId),
    status: 'offline'
  };
  
  res.status(201).json({ 
    message: 'Friend added successfully',
    friend: newFriend
  });
});

// --- Tutorials Routes ---
apiRouter.get('/tutorials', (req, res) => {
  const { sport } = req.query;
  let tutorials = [...store.tutorials];
  
  if (sport) {
    tutorials = tutorials.filter(t => t.sport.toLowerCase() === sport.toLowerCase());
  }
  
  res.json(tutorials);
});

apiRouter.get('/tutorials/:id', (req, res) => {
  const tutorial = store.tutorials.find(t => t.id === req.params.id);
  if (tutorial) {
    res.json(tutorial);
  } else {
    res.status(404).json({ error: 'Tutorial not found' });
  }
});

// --- Trainer Routes ---
apiRouter.get('/trainer/students', (req, res) => {
  res.json(store.students);
});

apiRouter.get('/trainer/students/:id', (req, res) => {
  const student = store.students.find(s => s.id === req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

apiRouter.get('/trainer/payments', (req, res) => {
  res.json(store.payments);
});

apiRouter.get('/trainer/timetable', (req, res) => {
  res.json(store.timetable);
});

apiRouter.post('/trainer/timetable', (req, res) => {
  const { day, time, student, sport, location, studentId } = req.body;
  
  const newSlot = {
    id: `tt${Date.now()}`,
    day,
    time,
    student,
    sport,
    location,
    studentId
  };
  
  store.timetable.push(newSlot);
  
  res.status(201).json({ 
    message: 'Timetable slot added successfully',
    slot: newSlot
  });
});

// --- Admin Routes ---
apiRouter.get('/admin/stats', (req, res) => {
  res.json(store.adminStats);
});

apiRouter.get('/admin/users', (req, res) => {
  res.json(store.users.filter(u => u.type === 'user'));
});

apiRouter.get('/admin/trainers', (req, res) => {
  res.json(store.users.filter(u => u.type === 'trainer'));
});

apiRouter.get('/admin/games', (req, res) => {
  res.json(store.games);
});

apiRouter.post('/admin/games', (req, res) => {
  const { name, icon, description } = req.body;
  
  const newGame = {
    id: `game${Date.now()}`,
    name,
    icon,
    description,
    popularity: 50
  };
  
  store.games.push(newGame);
  
  res.status(201).json({ 
    message: 'Game added successfully',
    game: newGame
  });
});

apiRouter.get('/admin/slots', (req, res) => {
  res.json(store.slots);
});

apiRouter.post('/admin/slots', (req, res) => {
  const { groundId, sport, date, time, price } = req.body;
  
  const ground = store.grounds.find(g => g.id === groundId);
  if (!ground) {
    return res.status(404).json({ error: 'Ground not found' });
  }
  
  const newSlot = {
    id: `s${Date.now()}`,
    groundId,
    sport: sport || ground.sport,
    date,
    time,
    price: price || ground.price,
    available: true
  };
  
  store.slots.push(newSlot);
  
  res.status(201).json({ 
    message: 'Slot created successfully',
    slot: newSlot
  });
});

apiRouter.get('/admin/reports', (req, res) => {
  res.json(store.reports);
});

apiRouter.post('/admin/reports', (req, res) => {
  const { reporterId, reportedId, reason } = req.body;
  
  const newReport = {
    id: `rep${Date.now()}`,
    reporterId,
    reportedId,
    reason,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0]
  };
  
  store.reports.push(newReport);
  
  res.status(201).json({ 
    message: 'Report submitted successfully',
    report: newReport
  });
});

apiRouter.put('/admin/reports/:id', (req, res) => {
  const { status } = req.body;
  const reportIndex = store.reports.findIndex(r => r.id === req.params.id);
  
  if (reportIndex === -1) {
    return res.status(404).json({ error: 'Report not found' });
  }
  
  store.reports[reportIndex].status = status;
  
  res.json({ 
    message: 'Report updated successfully',
    report: store.reports[reportIndex]
  });
});

// --- Chat Routes ---
apiRouter.get('/chat/messages', (req, res) => {
  res.json(store.messages);
});

apiRouter.post('/chat/message', (req, res) => {
  const { text, from } = req.body;
  
  const newMessage = {
    id: `m${Date.now()}`,
    from: from || 'User',
    text,
    timestamp: new Date().toISOString()
  };
  
  store.messages.push(newMessage);
  
  res.status(201).json({ 
    message: newMessage
  });
});

// --- Booking Routes ---
apiRouter.post('/bookings', (req, res) => {
  const { sport, ground, time, price, date } = req.body;
  
  if (!sport || !ground || !time) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const newActivity = {
    id: `a${Date.now()}`,
    title: `${sport} at ${ground}`,
    date: date || time,
    time: time,
    status: 'Upcoming',
    price: price || 0,
    ground: ground,
    sport: sport
  };

  store.activities.unshift(newActivity);
  store.user.stats.gamesPlayed++;
  store.adminStats.activeBookings++;
  store.adminStats.revenueToday += price || 15;

  res.status(201).json({ 
    message: 'Booking confirmed successfully',
    booking: newActivity
  });
});

apiRouter.get('/bookings', (req, res) => {
  res.json(store.activities);
});

// --- Trainer Booking Routes ---
apiRouter.post('/trainer-bookings', (req, res) => {
  const { trainerName, sport, date, time, sessionType, playerLevel } = req.body;
  
  if (!trainerName || !sport || !date || !time) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }

  const newBooking = {
    id: `tb${Date.now()}`,
    trainerName,
    sport,
    date,
    time,
    sessionType,
    playerLevel,
    status: 'Confirmed',
    createdAt: new Date()
  };

  res.status(201).json({ 
    message: 'Trainer booking confirmed successfully',
    booking: newBooking
  });
});
