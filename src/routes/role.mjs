import { Router } from "express";
import { body } from "express-validator";
import { getRoles, postRole } from "../controllers/role.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";

export const router = new Router();

//TODO: only a super admin can get the roles (middleware)
router.get("", [], getRoles);
router.post(
  "",
  [body("role_name", "Invalid value").notEmpty().isString(), checkForError],
  postRole
);
