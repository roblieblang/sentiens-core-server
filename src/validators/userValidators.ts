import { check, param } from "express-validator";

export const createUserValidators = [
  check("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters"),
  check("password")
    .isLength({ min: 10, max: 25 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase character")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
  check("isAdmin")
    .optional()
    .isBoolean()
    .withMessage("isAdmin must be a boolean value"),
  check("themePreference")
    .optional()
    .isIn(["light", "dark"])
    .withMessage('Theme must be either "light" or "dark"'),
];

export const updateUserValidators = [
  check("name")
    .optional()
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .escape()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters"),
  check("password")
    .optional()
    .isLength({ min: 10, max: 25 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase character")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
  check("themePreference")
    .optional()
    .isIn(["light", "dark"])
    .withMessage('Theme must be either "light" or "dark"'),
];

export const userIdValidator = [
  param("userId").isUUID().withMessage("ID must be in valid UUID format"),
];
