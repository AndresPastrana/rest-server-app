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
