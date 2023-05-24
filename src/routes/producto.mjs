import { Router } from "express";
import { body, param } from "express-validator";
import { ProductoController } from "../controllers/index.mjs";
import { verifyJWT } from "../middlewares/auth.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";
import { existCategory, existProduct, isRole } from "../middlewares/db-validator.mjs";

export const router = new Router();

router.get("/", [], ProductoController.getProductos);
router.get(
  "/:id",
  [
    param("id", "Invalid id").isMongoId(),
    checkForError,
  ],
  ProductoController.getProductoById
);

//TODO:
router.post(
  "/",
  [
    verifyJWT,
    body("name", "The product name is required").notEmpty(),

    checkForError,
    // TODO: existeProducto
    existCategory(),
  ],
  ProductoController.insertProducto
);
router.put(
  "/:id",
  [
    param("id", "Inavlid id").isMongoId(),
    checkForError,
    verifyJWT,
    existProduct,
  ],
  ProductoController.updateProducto
);

// Just an admin can delete a category
router.delete(
  "/:id",
  [
    param("id", "Invalid id").isMongoId(),
    checkForError,
    verifyJWT,
    isRole("USER"),
    existProduct
  ],
  ProductoController.deleteProductoById
);
