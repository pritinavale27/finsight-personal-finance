import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendSuccess, sendError } from './utils/apiResponse.js';
import { errorHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware Pipeline
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  sendSuccess(res, {
    status: 'healthy',
    platform: 'FinSight Backend Engine',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Root API placeholder route
app.get('/api', (_req: Request, res: Response) => {
  sendSuccess(res, {
    message: 'Welcome to FinSight Personal Finance Intelligence Platform API',
    version: '1.0.0',
    documentation: 'See README.md for endpoint specifications',
  });
});

// 404 Handler for undefined API routes
app.use('*', (_req: Request, res: Response) => {
  sendError(res, 'Requested endpoint not found', 404);
});

// Global Centralized Error Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [FinSight Server] Running on http://localhost:${PORT}`);
  console.log(`📡 [CORS Enabled] Accepting requests from: ${CLIENT_URL}`);
});
