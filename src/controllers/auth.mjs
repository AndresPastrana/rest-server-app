import UserModel from "../models/user.mjs";
import { request, response } from "express";
import { compareSync } from "bcrypt";
import { genJWT } from "../helpers/jwt.mjs";

export const login = async (req = request, resp = response) => {
  try {
    const { email, password } = req.body;
    const query = { email, state: true };

    const user = await UserModel.findOne(query);

    if (!user) {
      return resp.status(400).json({
        msg: "Invalid email or password",
      });
    }

    // TODO: compare the password sended with the hash we get before
    const isCorrectPassword = compareSync(password, user.password);

    if (!isCorrectPassword) {
      return resp.status(400).json({
        msg: "Invalid email or password",
      });
    }

    // TODO:generate token if the password is right

    const token = await genJWT({ id: user._id });
    console.log(token);
    return resp.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return resp.json(error);
  }
};

export const googleSignIn = (req, resp) => {
  const { user } = req;
  return resp.json({
    data: "Hola !!!!!!!!!!!!!",
    user,
  });
};