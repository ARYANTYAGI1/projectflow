require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/User');
const projectRoutes = require('./routes/Project');
const taskRoutes = require('./routes/Task');
const cors = require('cors');
const app = express();
app.use(express.json());
require('./helpers/cron');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  };
  
app.use(cors(corsOptions));
  
app.use('/api/users', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
