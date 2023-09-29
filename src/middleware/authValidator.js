import { check, validationResult } from "express-validator";

const registerAuthValidationRegister = [
  check("username")
    .notEmpty()
    .withMessage("username required")
    .isLength({ min: 5 })
    .withMessage("username must be at least 5s characters long."),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long."),
];

const loginAuthValidationRegister = [
  check("username").notEmpty().withMessage("username required"),
  check("password").notEmpty().withMessage("password required"),
];

const validateAuth = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ token: null, errors: errors.array() });
  }
  next();
};

export {
  registerAuthValidationRegister,
  loginAuthValidationRegister,
  validateAuth,
};
