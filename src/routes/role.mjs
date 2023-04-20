import { Router } from "express";
import { body } from "express-validator";
import { RoleController } from "../controllers/index.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";
import { existRole } from "../middlewares/db-validator.mjs";

export const router = new Router();

//TODO: only a super admin can get the roles (middleware)
router.get("", [], RoleController.getRoles);
router.post(
  "",
  [
    body("role_name", "Invalid value").isString().custom(existRole),
    checkForError,
  ],
  RoleController.postRole
);
