import { Router } from "express"
import UploadController from "../controllers/upload.mjs";
import { allowFormats } from "../middlewares/upload.mjs";

export const router = new Router();

// Just images
router.post('/image',[allowFormats(['.png','.jpg','.mp4'])],UploadController.uploadImage);

// router.post('/test',[allowFormats('.jpg')],UploadController.uploadImage)