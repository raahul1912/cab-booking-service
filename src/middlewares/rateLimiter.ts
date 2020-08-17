import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min in milliseconds
  max: 5,
  message: 'You have exceeded the 5 requests in 1 min limit!',
  headers: true
});
