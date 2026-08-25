import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import dotenv from 'dotenv';
dotenv.config(); // 🌿 Load Environment Variables

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// 📁 Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🛠 Import Routes & DB Config
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import jobRoutes from './routes/jobs.js';
import eventRoutes from './routes/events.js';
import connectionRoutes from './routes/connections.js';
import alumniRoutes from './routes/alumni.js';
import connectDB from './config/db.js';

// 🚀 Initialize App
const app = express();

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 💾 Connect to MongoDB
connectDB();
console.log('Mongo URI:', process.env.MONGO_URI);

// 🌐 API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/alumni', alumniRoutes);

// 🏗 Development root test (optional)
if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// 🏗 Serve Frontend (Production)
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/build');
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
}

// 🚫 404 Route Not Found Handler (MUST be below all valid routes)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// ❌ Global Error Handler (MUST be the last middleware)
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);

    const error = {
        success: false,
        message: err.message || 'Server Error',
    };

    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
        error.statusCode = 400;
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        error.message = `${field} already exists`;
        error.statusCode = 400;
    }

    if (err.name === 'JsonWebTokenError') {
        error.message = 'Invalid token';
        error.statusCode = 401;
    }

    if (err.name === 'TokenExpiredError') {
        error.message = 'Token expired';
        error.statusCode = 401;
    }

    res.status(error.statusCode || 500).json(error);
});

// 🖥 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
