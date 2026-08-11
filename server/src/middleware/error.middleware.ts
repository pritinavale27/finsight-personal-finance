import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse.js';

export interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
}

/**
 * Global Centralized Error Handling Middleware
 * Catches all unhandled controller exceptions and formats them into standardized JSON error responses.
 */
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  // Log error details for backend diagnostics (hidden from client response)
  console.error(`[ERROR] ${statusCode} - ${message}`, {
    stack: err.stack,
    details: err.details,
  });

  return sendError(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.details : undefined);
};
