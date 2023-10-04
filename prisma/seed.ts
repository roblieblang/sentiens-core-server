import { PrismaClient } from "@prisma/client";
import { seedJournalEntries, seedUsers } from "./seeds";

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedJournalEntries(prisma);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
