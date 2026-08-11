import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: unknown;
  };
}

/**
 * Standardized Success Response Helper
 */
export const sendSuccess = <T>(res: Response, data: T, statusCode: number = 200): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    data,
  };
  return res.status(statusCode).json(payload);
};

/**
 * Standardized Error Response Helper
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  details?: unknown
): Response => {
  const payload: ApiResponse = {
    success: false,
    error: {
      message,
      ...(details ? { details } : {}),
    },
  };
  return res.status(statusCode).json(payload);
};
