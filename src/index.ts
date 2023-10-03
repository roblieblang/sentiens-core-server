import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.use(async (req: Request, res: Response, next: NextFunction) => {
  req.prisma = prisma;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on("exit", async () => {
  await prisma.$disconnect();
});
