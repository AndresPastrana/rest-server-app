import { Router } from "express"
import UploadController from "../controllers/upload.mjs";

export const router = new Router();


router.post('/image',UploadController.uploadImage);

// router.post('/:collection/:id',[])