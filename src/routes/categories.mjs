import { Router } from "express";

export const router = new Router();

router.post("/", [], (req, resp) => {});
router.get("/", [], (req, resp) => {
  return resp.json({
    msg: "ok",
  });
});
router.put("/", [], (req, resp) => {});
router.delete("/:id", [], (req, resp) => {});
