import { Router } from "express";
import { body, param } from "express-validator";
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user.mjs";
import {
  existEmail,
  isValidRole,
  existUser,
} from "../middlewares/db-validator.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";

export const router = new Router();

//TODO: Middleware , just the admin can get all users  or delete a user

// TODO: validate acces token for all routes
// TODO: Append the auth_user info into the request when passes the token verification
// TODO: Implement the middlewares isRole , mightBeRole
// TODO: Optimizar app imports
router.delete(
  "/:id",
  [
    param("id", "Not a valid MongoID").isMongoId(),
    param("id").custom(existUser),
    checkForError,
  ],
  deleteUser
);
router.get("/", [], getUsers);

router.post(
  "/",
  [
    body(
      ["name", "email", "password"],
      "Missing required field. name,email, and password are required"
    ).notEmpty(),

    body("email", "Invalid value").isEmail().custom(existEmail),
    body("password", "Invalid value").isStrongPassword(),
    // TODO: role validation
    body("role").custom(isValidRole),
    checkForError,
  ],
  postUser
);
router.put(
  "/:id/",
  [
    param("id").custom(existUser),
    body("role").custom(isValidRole),
    checkForError,
  ],
  putUser
);
