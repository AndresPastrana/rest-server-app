import { request, response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.mjs";
import RoleModel from "../models/role.mjs";

export const getUsers = async (req = request, res = response) => {
  try {
    const query = { state: true };
    const { page = 1, perPage = 5 } = req.query;

    // TODO: Validaciones pagination
    const {
      totalUsers,
      pages,
      skip,
      page: currentPage,
    } = await UserModel.pagination(perPage, page, query);

    const users = await UserModel.find(query)
      .skip(Number(skip))
      .limit(Number(perPage))
      .populate("role", "role_name", RoleModel);

    return res.status(200).json({
      data: {
        users,
        pagination: {
          pages,
          currentPage,
          totalUsers,
          perPage,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const postUser = async (req = request, res = response) => {
  try {
    const { name, email, password, role } = req.body;
    const userDoc = new UserModel({ name, email, password, role });

    // Hash User password
    userDoc.password = bcrypt.hashSync(password, 10);

    // Save user
    const user = await userDoc.save();

    //TODO: Generate token
    const token = "tyr5645asdas";

    return res.status(201).json({
      data: {
        token,
      },
      msg: "Inserted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const putUser = async (req = request, res = response) => {
  try {
    const { params, body } = req;
    const { email = "", password = "", google = "", ...rest } = body;
    const { id } = params;

    const user = await UserModel.findByIdAndUpdate(id, rest, { new: true });
    return res.status(201).json({ data: user });
  } catch (error) {
    console.log(error);
    console.log("Error");
    return response.status(500).json(error);
  }
};

export const deleteUser = async (req = request, res = response) => {
  const { params } = req;
  const { id } = params;
  const userDoc = await UserModel.findById(id);
  userDoc.state = false;
  const savedDoc = await userDoc.save();
  return res.status(201).json({
    data: savedDoc,
  });
};
