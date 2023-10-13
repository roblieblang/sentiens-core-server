import express from "express";
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntryById,
  softDeleteJournalEntryById,
  updateJournalEntryById,
} from "../controllers/journalController";
import { checkUserExistence, validateRequest } from "../middleware";
import {
  createOrUpdateEntryValidator,
  entryIdValidator,
  userIdValidator,
} from "../validators";

// Turn on mergeParams to access parameters from parent ("users") route
const router = express.Router({ mergeParams: true });

// Create a new journal entry for a specific user
router.post(
  "/",
  userIdValidator,
  createOrUpdateEntryValidator,
  validateRequest,
  checkUserExistence,
  createJournalEntry
);

// Get all journal entries for a specific user
router.get(
  "/",
  userIdValidator,
  validateRequest,
  checkUserExistence,
  getJournalEntries
);

// Get a user's journal entry by its ID
router.get(
  "/:entryId",
  userIdValidator,
  entryIdValidator,
  validateRequest,
  checkUserExistence,
  getJournalEntryById
);

// Soft-delete a user's journal entry
router.patch(
  "/:entryId/delete",
  userIdValidator,
  entryIdValidator,
  validateRequest,
  checkUserExistence,
  softDeleteJournalEntryById
);

// Update a user's journal entry
router.patch(
  "/:entryId/update",
  userIdValidator,
  entryIdValidator,
  createOrUpdateEntryValidator,
  validateRequest,
  checkUserExistence,
  updateJournalEntryById
);

export default router;
