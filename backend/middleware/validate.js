const { body, validationResult } = require("express-validator");

exports.signupValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.createTaskValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Done"])
    .withMessage("Invalid status"),
  body("deadline")
    .isISO8601()
    .toDate()
    .withMessage("Valid deadline is required"),
];

exports.updateTaskValidation = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("status")
    .optional()
    .isIn(["Pending", "In Progress", "Done"])
    .withMessage("Invalid status"),
  body("deadline")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Valid deadline is required"),
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
