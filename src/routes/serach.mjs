import { Router } from "express";
import SearchController from "../controllers/serach.mjs";

export const router = new Router();


router.get('/:collection/:term',SearchController.search)