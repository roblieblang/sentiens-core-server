import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "rob@example.com",
    },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: "rob@example.com",
        name: "Rob Lie",
        password: "password",
        isAdmin: true,
      },
    });
  }
  for (let i = 0; i < 14; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password(),
        isAdmin: false,
        themePreference: faker.helpers.arrayElement(["dark", "light"]),
        lastLogin: faker.date.recent(),
      },
    });
  }
}
