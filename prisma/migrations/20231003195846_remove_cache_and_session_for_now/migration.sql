/*
  Warnings:

  - You are about to drop the `Cache` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cache" DROP CONSTRAINT "Cache_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "themePreference" SET DEFAULT 'light';

-- DropTable
DROP TABLE "Cache";

-- DropTable
DROP TABLE "Session";
