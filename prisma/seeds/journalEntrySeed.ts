import { PrismaClient } from "@prisma/client";

import { mockJournalEntries } from "../mocks/journalEntries";

export async function seedJournalEntries(prisma: PrismaClient) {
  const users = await prisma.user.findMany();
  const entriesPerUser = Math.floor(mockJournalEntries.length / users.length);

  const journalEntriesToCreate = [];

  for (const user of users) {
    const userEntries = [];

    // Assign a random entry to the user's array of entries
    const randomEntry = mockJournalEntries.splice(
      Math.floor(Math.random() * mockJournalEntries.length),
      1
    )[0];
    userEntries.push(randomEntry);

    // Assign additional random entries to the user's array of entries
    for (let i = 0; i < entriesPerUser - 1; i++) {
      const randomEntry = mockJournalEntries.splice(
        Math.floor(Math.random() * mockJournalEntries.length),
        1
      )[0];
      userEntries.push(randomEntry);
    }

    // Build the array of objects to insert
    for (const entry of userEntries) {
      journalEntriesToCreate.push({
        content: entry.text,
        userId: user.id,
      });
    }
  }

  // Batch insert the journal entries
  await prisma.journalEntry.createMany({
    data: journalEntriesToCreate,
  });
}
