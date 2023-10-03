import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

  for (let i = 0; i < 10; i++) {
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

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
