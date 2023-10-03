import express from 'express';

declare global {
  namespace Express {
    interface Request {
      prisma: import('@prisma/client').PrismaClient;
    }
  }
}
