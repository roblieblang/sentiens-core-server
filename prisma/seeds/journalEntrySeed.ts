import { JournalEntry, PrismaClient } from "@prisma/client";

import { mockJournalEntries } from "../mocks/journalEntries";

export async function seedJournalEntries(prisma: PrismaClient) {
  const users = await prisma.user.findMany();
  const entriesPerUser = Math.floor(mockJournalEntries.length / users.length);

  const journalEntriesToCreate: { content: string; userId: string }[] = [];

  for (const user of users) {
    const userEntries: JournalEntry[] = [];

    // Assign a random entry to the user's array of entries
    let randomEntry = mockJournalEntries.splice(
      Math.floor(Math.random() * mockJournalEntries.length),
      1
    )[0];
    journalEntriesToCreate.push({
      content: randomEntry.text,
      userId: user.id,
    });

    // Assign additional random entries to the user's array of entries
    for (let i = 0; i < entriesPerUser - 1; i++) {
      randomEntry = mockJournalEntries.splice(
        Math.floor(Math.random() * mockJournalEntries.length),
        1
      )[0];
      journalEntriesToCreate.push({
        content: randomEntry.text,
        userId: user.id,
      });
    }
  }

  // Batch insert the journal entries
  await prisma.journalEntry.createMany({
    data: journalEntriesToCreate,
  });
}
