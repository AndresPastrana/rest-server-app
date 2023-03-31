import { request, response } from "express";
import RoleModel from "../models/role.mjs";

export const getRoles = async (req = request, res = response) => {
  try {
    const roles = await RoleModel.find();
    return res.json({ data: roles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const postRole = async (req = request, res = response) => {
  const { body } = req;
  try {
    const roleDoc = new RoleModel(body);
    const roleSaved = await roleDoc.save();

    return res.json({
      data: roleSaved,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
      error,
    });
  }
};
