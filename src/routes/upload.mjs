import { Router } from "express"
import { check, param } from "express-validator";
import UploadController from "../controllers/upload.mjs";
import { verifyJWT } from "../middlewares/auth.mjs";
import { checkForError } from "../middlewares/checkForErrors.mjs";
import { validCollections } from "../middlewares/db-validator.mjs";
import { allowFormats } from "../middlewares/upload.mjs";

export const router = new Router();
// Just images
// router.post('/image',[allowFormats(['.png','.jpg','.mp4'])],UploadController.uploadImage);

router.put('/:collection/:id/',
[
check('collection').custom(validCollections(['users','products'])),
check('id' , "Invlaid mongoID").isMongoId(),
checkForError,
verifyJWT,
allowFormats(['.png', '.jpg'])
], 
UploadController.updatePicture);
