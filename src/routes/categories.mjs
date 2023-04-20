import { Router } from "express";
import { body, header } from "express-validator";
import { CategoryController } from "../controllers/index.mjs";
import { verifyJWT } from "../middlewares/auth.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";
import { existCategory } from "../middlewares/db-validator.mjs";

export const router = new Router();

// Public
router.get("/", [CategoryController.getCategories], (req, resp) => {
  return resp.json({
    msg: "ok",
  });
});
router.get("/:id", [CategoryController.getCategoryById], (req, resp) => {
  return resp.json({
    msg: "ok",
  });
});

//TODO:
//Private any person with a valid token 401
// In the body should come {name} 400

// TODO: db validators
// user should exist in the db and have a valid state 400
// The sended category should not exist in the the db 400
router.post(
  "/",
  [
    body("name", "The category name is required").notEmpty(),
    checkForError,
    verifyJWT,
    existCategory(true),
  ],
  CategoryController.insertCategory
);

router.put("/:id", [CategoryController.updateCategoryById], (req, resp) => {});

// Just an admin can delete a category
router.delete(
  "/:id",
  [CategoryController.deleteCategoryById],
  (req, resp) => {}
);
