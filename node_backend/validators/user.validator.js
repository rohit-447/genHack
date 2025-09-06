import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),
  
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
