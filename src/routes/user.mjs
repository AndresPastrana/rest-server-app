import { Router } from "express";
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/user.mjs";

export const router = new Router();

router.get("/", [], getUsers);
router.post("/", [], postUser);
router.put("/:id/", [], putUser);
router.delete("/:id", [], deleteUser);
