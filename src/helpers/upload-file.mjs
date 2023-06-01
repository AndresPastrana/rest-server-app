import { upload } from "../middlewares/multer.mjs";
export const uploadFile = (req, resp) => {
    return new Promise((resolve, reject) => {
        upload(req, resp, function (err) {

            // Format Error
            if (!!req.fileFormatValidator) return reject({ error: "Invalid file format" });

            // Multer Errors
            if (err) return reject({ error: err.message });

            // No file sended
            if (!req.file) return reject({ error: "There is no a file to upload" });

            req.file.url = `http://localhost:2500/uploads/${req.file.filename}`;
            return resolve(req.file);
        });
    })
}
