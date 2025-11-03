// // require('dotenv').config();
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const path = require('path');

// // // Import routes
// // const authRoutes = require('./routes/auth');
// // const userRoutes = require('./routes/users');
// // const jobRoutes = require('./routes/jobs');
// // const eventRoutes = require('./routes/events');
// // const connectionRoutes = require('./routes/connections');
// // const alumniRoutes = require('./routes/alumni');

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Database connection
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-portal', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // })
// //     .then(() => console.log('Connected to MongoDB'))
// //     .catch(err => console.error('MongoDB connection error:', err));

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/users', userRoutes);
// // app.use('/api/jobs', jobRoutes);
// // app.use('/api/events', eventRoutes);
// // app.use('/api/connections', connectionRoutes);
// // app.use('/api/alumni', alumniRoutes);

// // // 404 handler
// // app.use((req, res) => {
// //     res.status(404).json({
// //         success: false,
// //         message: 'Route not found'
// //     });
// // });

// // // Global error handler middleware
// // app.use((err, req, res, next) => {
// //     console.error('Error:', err);

// //     // Default error
// //     let error = {
// //         success: false,
// //         message: err.message || 'Server Error'
// //     };

// //     // Mongoose validation error
// //     if (err.name === 'ValidationError') {
// //         const message = Object.values(err.errors)
// //             .map(val => val.message)
// //             .join(', ');
// //         error.message = message;
// //         error.statusCode = 400;
// //     }

// //     // Mongoose duplicate key error
// //     if (err.code === 11000) {
// //         const field = Object.keys(err.keyValue)[0];
// //         error.message = `${field} already exists`;
// //         error.statusCode = 400;
// //     }

// //     // JWT errors
// //     if (err.name === 'JsonWebTokenError') {
// //         error.message = 'Invalid token';
// //         error.statusCode = 401;
// //     }

// //     if (err.name === 'TokenExpiredError') {
// //         error.message = 'Token expired';
// //         error.statusCode = 401;
// //     }

// //     // Custom error response
// //     if (err.statusCode) {
// //         error.statusCode = err.statusCode;
// //     }

// //     const statusCode = error.statusCode || 500;

// //     res.status(statusCode).json(error);
// // });

// // // Serve static assets in production
// // if (process.env.NODE_ENV === 'production') {
// //     // Set static folder
// //     app.use(express.static(path.join(__dirname, '../frontend/build')));

// //     app.get('*', (req, res) => {
// //         res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
// //     });
// // }

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import dotenv from 'dotenv';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Load environment variables
// dotenv.config();

// // ES module fix for __dirname and __filename
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // Import routes
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';

// import jobRoutes from './routes/jobs.js';
// import eventRoutes from './routes/events.js';
// import connectionRoutes from './routes/connections.js';
// import alumniRoutes from './routes/alumni.js';

// const app = express();

// // ====== Middleware ======
// app.use(cors());
// app.use(express.json());

// // ====== Database Connection ======
// mongoose
//     .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alumni-portal', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('✅ Connected to MongoDB'))
//     .catch((err) => console.error('❌ MongoDB connection error:', err));

// // ====== Routes ======
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/connections', connectionRoutes);
// app.use('/api/alumni', alumniRoutes);

// // ====== 404 Handler ======
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found',
//     });
// });

// // ====== Global Error Handler ======
// app.use((err, req, res, next) => {
//     console.error('Error:', err);

//     const error = {
//         success: false,
//         message: err.message || 'Server Error',
//     };

//     // Mongoose validation error
//     if (err.name === 'ValidationError') {
//         error.message = Object.values(err.errors)
//             .map((val) => val.message)
//             .join(', ');
//         error.statusCode = 400;
//     }

//     // Mongoose duplicate key error
//     if (err.code === 11000) {
//         const field = Object.keys(err.keyValue)[0];
//         error.message = `${field} already exists`;
//         error.statusCode = 400;
//     }

//     // JWT errors
//     if (err.name === 'JsonWebTokenError') {
//         error.message = 'Invalid token';
//         error.statusCode = 401;
//     }

//     if (err.name === 'TokenExpiredError') {
//         error.message = 'Token expired';
//         error.statusCode = 401;
//     }

//     const statusCode = error.statusCode || 500;
//     res.status(statusCode).json(error);
// });

// // ====== Serve Frontend in Production ======
// if (process.env.NODE_ENV === 'production') {
//     const frontendPath = path.join(__dirname, '../frontend/build');
//     app.use(express.static(frontendPath));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(frontendPath, 'index.html'));
//     });
// }

// // ====== Start Server ======
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// // import express from 'express';
// // import dotenv from 'dotenv';
// // import cookieParser from 'cookie-parser';
// // import connectDB from './config/db.js';
// // import authRoutes from './routes/auth.js';

// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(express.json());
// // app.use(cookieParser());

// // app.use('/api', authRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import dotenv from 'dotenv';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // ====== Load environment variables ======
// dotenv.config();

// // ====== Fix for __dirname and __filename in ES Modules ======
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ====== Import routes ======
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
// import jobRoutes from './routes/jobs.js';
// import eventRoutes from './routes/events.js';
// import connectionRoutes from './routes/connections.js';
// import alumniRoutes from './routes/alumni.js';
// import connectDB from './config/db.js';

// // ====== Initialize app ======
// const app = express();

// // ====== Middleware ======
// app.use(cors());
// app.use(express.json());

// // ====== MongoDB Connection ======
// //  const MONGO_URI = process.env.MONGO_URI  
// // // connectDB()
// // mongoose
// //     .connect(MONGO_URI, {
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true,
// //     })
// //     .then(() => console.log(`✅ Connected to MongoDB: ${MONGO_URI}`))
// //     .catch((err) => {
// //         console.error('❌ MongoDB connection error:', err.message);
// //         process.exit(1);
// //     });


// dotenv.config();
// connectDB();

// console.log("Mongo URI:", process.env.MONGO_URI);

// // ====== API Routes ======
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/connections', connectionRoutes);
// app.use('/api/alumni', alumniRoutes);

// // ====== 404 Handler ======
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: 'Route not found',
//     });
// });

// // ====== Global Error Handler ======
// app.use((err, req, res, next) => {
//     console.error('❌ Error:', err);

//     const error = {
//         success: false,
//         message: err.message || 'Server Error',
//     };

//     // Validation error
//     if (err.name === 'ValidationError') {
//         error.message = Object.values(err.errors)
//             .map((val) => val.message)
//             .join(', ');
//         error.statusCode = 400;
//     }

//     // Duplicate key error
//     if (err.code === 11000) {
//         const field = Object.keys(err.keyValue)[0];
//         error.message = `${field} already exists`;
//         error.statusCode = 400;
//     }

//     // JWT errors
//     if (err.name === 'JsonWebTokenError') {
//         error.message = 'Invalid token';
//         error.statusCode = 401;
//     }

//     if (err.name === 'TokenExpiredError') {
//         error.message = 'Token expired';
//         error.statusCode = 401;
//     }

//     res.status(error.statusCode || 500).json(error);
// });

// // ====== Serve Frontend (Production only) ======
// if (process.env.NODE_ENV === 'production') {
//     const frontendPath = path.join(__dirname, '../frontend/build');
//     app.use(express.static(frontendPath));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(frontendPath, 'index.html'));
//     });
// }

// // ====== Start Server ======
// const PORT = process.env.PORT || 5000;
//  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// ============================
// 🌿 Load Environment Variables
// ============================
dotenv.config();

// ============================
// 📁 Fix for __dirname in ES Modules
// ============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================
// 🛠 Import Routes & DB Config
// ============================
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import jobRoutes from './routes/jobs.js';
import eventRoutes from './routes/events.js';
import connectionRoutes from './routes/connections.js';
import alumniRoutes from './routes/alumni.js';
import connectDB from './config/db.js';

// ============================
// 🚀 Initialize App
// ============================
const app = express();

// ============================
// 🧩 Middleware
// ============================
app.use(cors());
app.use(express.json());

// ============================
// 💾 Connect to MongoDB
// ============================
connectDB();
console.log('Mongo URI:', process.env.MONGO_URI);

// ============================
// 🌐 API Routes
// ============================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/alumni', alumniRoutes);

// ============================
// 🚫 404 Route Not Found Handler
// ============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// ============================
// ❌ Global Error Handler
// ============================
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);

    const error = {
        success: false,
        message: err.message || 'Server Error',
    };

    // Validation Error
    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
        error.statusCode = 400;
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        error.message = `${field} already exists`;
        error.statusCode = 400;
    }

    // JWT Errors
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

// ============================
// 🏗 Serve Frontend (Production)
// ============================
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/build');
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });

    
}
app.use('/', (req, res) => {
    res.send("hello world")
})

// ============================
// 🖥 Start Server
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
