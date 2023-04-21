import { Router } from "express";
import { body, header, param } from "express-validator";
import { CategoryController } from "../controllers/index.mjs";
import { verifyJWT } from "../middlewares/auth.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";
import { existCategory, isRole } from "../middlewares/db-validator.mjs";

export const router = new Router();

router.get("/", [], CategoryController.getCategories);
router.get(
  "/:id",
  [
    param("id", "Invalid id").isMongoId(),
    checkForError,
    existCategory(false, "id"),
  ],
  CategoryController.getCategoryById
);

//TODO:
router.post(
  "/",
  [
    body("name", "The category name is required").notEmpty(),
    checkForError,
    verifyJWT,
    existCategory(true, "name"),
  ],
  CategoryController.insertCategory
);
router.put(
  "/:id",
  [
    param("id", "Inavlid id").isMongoId(),
    body("name", "The name is required").notEmpty(),
    checkForError,
    verifyJWT,
    existCategory(false, "id"),
    existCategory(true, "name"),
  ],
  CategoryController.updateCategoryById
);

// Just an admin can delete a category
router.delete(
  "/:id",
  [
    param("id", "Invalid id").isMongoId(),
    checkForError,
    verifyJWT,
    existCategory(false, "id"),
    isRole("USER"),
  ],
  CategoryController.deleteCategoryById
);
