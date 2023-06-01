import { fileURLToPath } from 'url';
import multer from "multer";
import {v4 as uuidv4} from 'uuid'
import path from 'path';
import { isFormat } from "../helpers/validate-file-format.mjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileFilter = (req, file, cb) => {

    // Thos allowed formats comes from the middlware allowFormats() 
    const {allowedFormats} = req;
    const isValid = isFormat(file,allowedFormats);
    if (!isValid) {
        req.fileFormatValidator = true;
        return cb(null, false);
    }
    return cb(null, true);
}


const limits = {
    fileSize: 1048000000
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
      const fileType = file.mimetype.split('/')[0];
      let folder ='';
        switch (fileType) {
            case 'image':
                 folder = 'images/'
                break;

            case 'video':
                folder = 'videos/'
                  break;
        
            default:
                break;
        }
        console.log(folder);
        cb(null, path.join(__dirname,'../../public/uploads/',`${folder}`));
    },

    filename: (req, file, cb) => {
        
        const uniquePreffix = uuidv4();
        const ext = file.mimetype.split('/')[1];
        return cb(null, `${uniquePreffix}.${ext}`)
    }
});



export const upload = multer({ limits, fileFilter, storage }).single('image_uploads')


// NOTE: Si no hay ningun archivo en la request multer no ejecuta ninguno de sus middlewares

