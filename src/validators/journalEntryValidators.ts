import { check, param, validationResult } from "express-validator";

export const entryIdValidator = [
  param("entryId")
    .isNumeric()
    .withMessage("Journal Entry ID must be a valid number."),
];

export const createOrUpdateEntryValidator = [
  check("content")
    .isString()
    .withMessage("Content must be a valid string.")
    .notEmpty()
    .withMessage("Content cannot be empty."),
];
