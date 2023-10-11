import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import morgan from "morgan";
import prisma from "./utils/prisma";

import { journalRoutes, userRoutes } from "./routes";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

// Morgan logging middleware
app.use(morgan("dev"));

// Body parser middleware
app.use(express.json());

// CORS
// const allowedOrigins = [];
// const corsOptions: cors.CorsOptions = {
//   origin: allowedOrigins
// };
// app.use(cors(corsOptions))
app.use(cors());

// Middleware to attach the Prisma client to each request
app.use((req: Request, res: Response, next: NextFunction) => {
  req.prisma = prisma;
  next();
});

// Routes
// Users
app.use("/users", userRoutes);
// Journal Entries
app.use("/users/:userId/journal-entries", journalRoutes);

// express-validator route validation middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

// Error-handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ error: error.message });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handle server shutdown on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Gracefully shutting down server");
  await prisma.$disconnect();
  process.exit(0);
});
