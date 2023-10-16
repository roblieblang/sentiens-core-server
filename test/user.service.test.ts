import { expect, test, vi } from "vitest";
import prisma from "../src/lib/__mocks__/prisma";
import {
  insertNewUser,
  retrieveAllUsers,
  retrieveUser,
} from "../src/services/user.service";

vi.mock("../src/lib/prisma.ts");

const mockUser = {
  id: "facefaceface-face-face-face-facefaceface",
  email: "default@default.com",
  name: "Default",
  password: "",
  isAdmin: false,
  themePreference: "light",
  createdAt: new Date(),
  lastLogin: null,
  deletedAt: null,
};

test("insertNewUser should return the generated user", async () => {
  const newUser = { ...mockUser };
  prisma.user.create.mockResolvedValue({
    ...newUser,
  });
  const user = await insertNewUser(newUser);
  expect(user).toStrictEqual({
    ...newUser,
  });
});

test("retrieveAllUsers should return all users", async () => {
  const expectedUsers = [
    {
      ...mockUser,
      id: "12345678-1234-1234-1234-123456789015",
      email: "tza@wugang.net",
    },
  ];

  prisma.user.findMany.mockResolvedValue(expectedUsers);

  const users = await retrieveAllUsers();
  expect(users).toStrictEqual(expectedUsers);
});

test("retrieveUser should throw an error when no ID found", async () => {
  prisma.user.findUnique.mockImplementation(() => {
    throw new Error("There was an error.");
  });

  await expect(retrieveUser("a")).rejects.toThrow();
  await expect(retrieveUser("a")).rejects.toThrowError("There was an error.");
});
