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

export const existCategory = (b = false) => {
  return async (req, resp, next) => {
    const { name } = req.body;
    const category = await CategoryModel.findOne({ name });

    // Bloquear la peticion si la categoria existe
    if (b && category) return resp.json({ msg: "This category alredy exist" });

    if (b && !category) return next();

    // Bloquear la peticion si la categoria no existe
    if (!category)
      return resp.status(400).json({ msg: "tThe category does not exist" });

    next();
  };
};
