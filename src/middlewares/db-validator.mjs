import { Types } from "mongoose";
import CategoryModel from "../models/category.mjs";
import ProductoModel from "../models/producto.mjs";
import RoleModel from "../models/role.mjs";
import UserModel from "../models/user.mjs";

export const existEmail = async (email = "") => {
  const existe = await UserModel.exists({ email });
  if (existe) {
    throw new Error("This user alredy exist");
  }
};

export const existRole = async (role_name = "") => {
  const existe = await RoleModel.exists({ role_name });
  if (existe) {
    throw new Error("This role_name alredy exist ");
  }
};

export const existUser = async (id = "") => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw new Error(`It does not exist a user with the id: ${id}`);
  }
};

export const isValidRole = async (id = "") => {
  const existe = await RoleModel.findById(id);

  if (!existe) {
    throw new Error("Invalid role");
  }
};

export const isRole = (wantsBoBeRole) => {
  return async (req, resp, next) => {
    const { role } = req.user;
    console.log(role);
    const {role_name}  = await RoleModel.findById(role).exec();
       
    if (wantsBoBeRole !== role_name) {
      return resp.status(401).json({
        msg: `Unathorized operation, just an ${wantsBoBeRole} can perfore this operation`,
      });
    }
    next();
  };
};

export const existCategory = (b = false, serachBy = "id") => {
  return async (req, resp, next) => {
    let category;
    if (serachBy === "name") {
      const { name } = req.body;
      category = await CategoryModel.findOne({ name });
    }
    if (serachBy === "id") {
      const id_string = req.params.id || req.body.category;
      const _id = new Types.ObjectId(id_string);  
    

      category = await CategoryModel.findOne({
        state: true,
        _id,
      });
    }

    // Bloquear la peticion si la categoria existe
    if (b && category) return resp.json({ msg: "This category alredy exist" });
    if (b && !category) {
      req.category = category;
       return next();
    };

    // Bloquear la peticion si la categoria no existe
    if (!category){
      return resp.status(400).json({ msg: "The category does not exist" });
    }
    req.category = category;
    next();
  };
};

// TODO:
// Make a function to block a request if a document exist or not
// Will recive : blockIf : 'exist' | 'notExist' 
export const existProduct = async (req,resp,next)=>{
  const {id} =req.params;
  const query = {_id: new Types.ObjectId(id),state: true};
  const product = await ProductoModel.findOne(query);
  if (!product) {
   return resp.status(404).json({msg: "Product not found"})
  }
  req.product = product;
  
  return next();
}

export const existProductByName = async (req,resp,next)=>{
  const {name} =req.body;
  const query = {name,state: true};
  const product = await ProductoModel.findOne(query);

  if (product) {
   return resp.status(400).json({msg: "This product alredy exist"})
  }

  
  return next();
}


export const  validCollections=(collections)=>{
      return (param)=>{
        if (!collections.includes(param)) throw new Error("Invalid collection");
        return true;
      }
}

// export const existProduct = (b = false, serachBy = "id") => {
//   return async (req, resp, next) => {
//     let product;
//     if (serachBy === "name") {
//       const { name } = req.body;
//       product = await ProductoModel.findOne({ name });
//     }
//     if (serachBy === "id") {
//       const id_string = req.params.id || req.body.id;
//       const _id = new Types.ObjectId(id_string);  
//       product = await ProductoModel.findOne({
//         state: true,
//         _id,
//       });
//     }

//     // Bloquear la peticion si el producto existe
//     if (b && product) return resp.json({ msg: "This category alredy exist" });
//     if (b && !product) {
//       req.product = product;
//        return next();
//     };

//     // Bloquear la peticion si la categoria no existe
//     if (!product){
//       return resp.status(400).json({ msg: "The category does not exist" });
//     }
//     req.product = product;
//     next();
//   };
// };
