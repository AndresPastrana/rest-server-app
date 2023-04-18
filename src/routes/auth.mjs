import { Router } from "express";
import { body, check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.mjs";
import { verifyGoogleToken } from "../middlewares/auth.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";
import { existEmail } from "../middlewares/db-validator.mjs";

export const router = new Router();
router.post(
  "/login",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").notEmpty(),
    checkForError,
  ],
  login
);

router.post(
  "/google",
  [
    body("id_token", "id_token is required").notEmpty(),
    checkForError,
    verifyGoogleToken,
  ],
  googleSignIn
);
