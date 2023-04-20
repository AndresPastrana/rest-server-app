import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/index.mjs";
import { existEmail } from "../middlewares/db-validator.mjs";
import { verifyGoogleToken } from "../middlewares/auth.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";

export const router = new Router();
router.post(
  "/login",
  [
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").notEmpty(),
    checkForError,
  ],
  AuthController.login
);

router.post(
  "/google",
  [
    body("id_token", "id_token is required").notEmpty(),
    checkForError,
    verifyGoogleToken,
  ],
  AuthController.googleSignIn
);
