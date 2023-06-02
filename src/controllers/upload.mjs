import { Schema } from "mongoose";
import { uploadFile } from "../helpers/upload-file.mjs"
import ProductoModel from "../models/producto.mjs";
import UserModel from "../models/user.mjs";

const uploadImage = async (req, resp) => {
    try {
        const file = await uploadFile(req, resp);
        return resp.json(file)
    } catch (error) {
        console.log(error);
        return resp.status(400).json(error)
    }

}


const updatePicture = async (req, resp) => {
    console.log("Lalall");
    try {
        const { collection } = req.params;
        const { user } = req;

       
        

        const file = await uploadFile(req, resp);
        console.log(file);
        switch (collection) {
            case 'users':
                // We need the temporal path 
                user.url_avatar = file.url;
             
                  
                //TODO:  Clean up old image from local repo if the doc has alredy an image
                //TODO: Clean up of older pictures of cloudinary if the doc has alredy an image 
                //TODO: Upload image to cloudinary
                await user.save();
                return resp.json({ ...file, ...user });


            case 'products':
                const product = await ProductoModel.findById(req.params.id);
                if (!product) return resp.json({ succes: false, error: `The document with the id \"${req.params.id}\" doesn't exist` });
                product.img = file.url;
                product.user = req.user._id;
                await product.save();
                return resp.json({ url: file.url, ...product._doc })
            default:
                return resp.status(500).json({
                    success: false,
                    error: "This feature isn't aviable yet"
                })
        }

    } catch (error) {
        console.log(error);
        return resp.status(400).json(error)
    }
}

const UploadController = Object.freeze({ uploadImage, updatePicture });
export default UploadController;