import express from "express";
import {
  createJournalEntry,
  deleteJournalEntryById,
  getJournalEntries,
  getJournalEntryById,
  updateJournalEntryById,
} from "../controllers/journalControllers";
import { checkUserExistence, validateRequest } from "../middleware";
import {
  createOrUpdateEntryValidator,
  entryIdValidator,
  userIdValidator,
} from "../validators";

// Turn on mergeParams to access parameters from parent ("user") route
const router = express.Router({ mergeParams: true });

// Create a new journal entry for a specific user
router.post(
  "/users/:userId/journal-entries",
  userIdValidator,
  createOrUpdateEntryValidator,
  validateRequest,
  checkUserExistence,
  createJournalEntry
);

// Get all journal entries for a specific user
router.get(
  "/users/:userId/journal-entries",
  userIdValidator,
  validateRequest,
  checkUserExistence,
  getJournalEntries
);

// Get a user's journal entry by its ID
router.get(
  "/users/:userId/journal-entries/:entryId",
  userIdValidator,
  entryIdValidator,
  validateRequest,
  checkUserExistence,
  getJournalEntryById
);

// Delete a user's journal entry
router.delete(
  "/users/:userId/journal-entries/:entryId",
  userIdValidator,
  entryIdValidator,
  validateRequest,
  checkUserExistence,
  deleteJournalEntryById
);

// Update a user's journal entry
router.patch(
  "/users/:userId/journal-entries/:entryId",
  userIdValidator,
  entryIdValidator,
  createOrUpdateEntryValidator,
  validateRequest,
  checkUserExistence,
  updateJournalEntryById
);

export default router;
