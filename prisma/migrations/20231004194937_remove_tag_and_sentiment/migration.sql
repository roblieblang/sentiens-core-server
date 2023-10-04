/*
  Warnings:

  - You are about to drop the column `sentimentLabels` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `sentimentScore` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the `SentimentFeedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SentimentFeedback" DROP CONSTRAINT "SentimentFeedback_journalEntryId_fkey";

-- DropForeignKey
ALTER TABLE "SentimentFeedback" DROP CONSTRAINT "SentimentFeedback_userId_fkey";

-- AlterTable
ALTER TABLE "JournalEntry" DROP COLUMN "sentimentLabels",
DROP COLUMN "sentimentScore",
DROP COLUMN "tags";

-- DropTable
DROP TABLE "SentimentFeedback";

-- DropTable
DROP TABLE "Tag";
