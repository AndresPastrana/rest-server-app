import { uploadFile } from "../helpers/upload-file.mjs"

const uploadImage = async (req,resp)=>{
    try {
        const file = await uploadFile(req,resp);
        return resp.json(file)
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error)
    }

}

const UploadController = Object.freeze({ uploadImage});
export default UploadController;