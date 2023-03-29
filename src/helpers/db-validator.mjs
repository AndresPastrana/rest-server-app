import RoleModel from "../models/role.mjs";
import UserModel from "../models/user.mjs";

export const userExist = async (email) => {
  const existe = await UserModel.exists({ email });
  return existe;
};

export const roleExist = async (role_name) => {
  const existe = await RoleModel.exists({ role_name });
  return existe?._id ? true : false;
};
