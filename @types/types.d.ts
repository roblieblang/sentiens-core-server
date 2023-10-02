    declare namespace Express {
      export interface Request {
        prisma: import('@prisma/client').PrismaClient;
      }
    }