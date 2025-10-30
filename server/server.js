import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import rateLimit from 'express-rate-limit';

import aiRouter from './routes/aiRoutes.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import db from './configs/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || true,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Clerk middleware
app.use(clerkMiddleware());

// Request logging
app.use((req, res, next) => {
  console.log(`🚀 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

// Health check
app.get('/health', async (req, res) => {
  const dbHealth = await db.healthCheck();
  res.status(dbHealth ? 200 : 503).json({
    status: dbHealth ? 'OK' : 'Unhealthy',
    timestamp: new Date().toISOString(),
    database: dbHealth ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV
  });
});

// Routes
app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Startup
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectCloudinary();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;