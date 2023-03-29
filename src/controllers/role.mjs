import { request, response } from "express";
import RoleModel from "../models/role.mjs";
import { roleExist } from "../helpers/db-validator.mjs";

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
    console.log(roleDoc);
    const existe = await roleExist(roleDoc.role_name);
    console.log(existe);
    if (!existe) {
      console.log("Inserting....");
      const roleSaved = await roleDoc.save();
      return res.json({
        data: roleSaved,
      });
    }

    return res.status(400).json({
      msg: "This role alredy exist",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};
