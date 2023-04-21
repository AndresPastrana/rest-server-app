import { Types } from "mongoose";
import CategoryModel from "../models/category.mjs";
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
    const { role_name } = await RoleModel.findById(role);

    if (wantsBoBeRole !== role_name) {
      return resp.status(401).json({
        msg: "Unathorized operation, just an admin can delete a category",
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
      const { id } = req.params;

      category = await CategoryModel.findOne({
        state: true,
        _id: new Types.ObjectId(id),
      });
    }

    // Bloquear la peticion si la categoria existe
    if (b && category) return resp.json({ msg: "This category alredy exist" });
    if (b && !category) return next();

    // Bloquear la peticion si la categoria no existe
    if (!category)
      return resp.status(400).json({ msg: "The category does not exist" });
    req.category = category;
    next();
  };
};
