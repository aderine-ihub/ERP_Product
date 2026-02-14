import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err.stack);
  
  const response: ApiResponse<never> = {
    success: false,
    error: err.message || 'Internal server error',
  };
  
  res.status(500).json(response);
};
