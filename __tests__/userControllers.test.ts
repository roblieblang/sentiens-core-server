import express from "express";
import request from "supertest";

import { userRoutes } from "../src/routes";
import prisma from "../src/utils/prisma";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("GET /users/:id", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should fetch a user by ID", async () => {
    // Admin user
    const testUserID = "90546054-dbd7-4551-8988-ee8a9a372de7";
    const res = await request(app).get(`/users/${testUserID}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should return 404 if user not found", async () => {
    const nonExistentUserID = "kasdfasdfasdfajsdbflikjahsdlfohasldkfhalskdf";
    const res = await request(app).get(`/users/${nonExistentUserID}`);
    expect(res.statusCode).toEqual(404);
  });
});
