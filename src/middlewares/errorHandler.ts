import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - Stack: ${err.stack}`
  );
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    statusCode: err.statusCode || 500,
    data: err.data,
    stack: err.stack
  };

  return res.status(err.statusCode || 500).send(errorDetails);
};
