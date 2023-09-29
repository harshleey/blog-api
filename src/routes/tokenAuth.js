import express from "express";
import { register, login, profile } from "../controllers/tokenAuth.js";
import { tokenAuth } from "../middleware/tokenAuth.js";
import {
  loginAuthValidationRegister,
  registerAuthValidationRegister,
  validateAuth,
} from "../middleware/authValidator.js";

const router = express.Router();

router.post(
  "/register",
  registerAuthValidationRegister,
  validateAuth,
  register
);
router.post("/login", loginAuthValidationRegister, validateAuth, login);
router.get("/profile", tokenAuth, profile);

export default router;
