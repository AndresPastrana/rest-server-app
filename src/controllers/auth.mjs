import UserModel from "../models/user.mjs";
import { request, response } from "express";
import { compareSync } from "bcrypt";
import { genJWT } from "../helpers/jwt.mjs";

const login = async (req = request, resp = response) => {
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

    const token = await genJWT({ uid: user._id.toString() });
    return resp.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return resp.json(error);
  }
};

const googleSignIn = async (req, resp) => {
  try {
    const { email, picture: img, name } = req.body;

    const query = { email, state: true };
    let user = await UserModel.findOne(query);
    if (!user) {
      user = new UserModel({
        email,
        google: true,
        url_avatar: img,
        name,
        password: ":P",
      });
      await user.save();
    }

    // TODO:generate token if the password is right
    const token = await genJWT({ uid: user._id.toString() });
    return resp.json({
      token,
      user,
    });
  } catch (error) {
    resp.json(error);
  }
};

const AuthController = Object.seal({
  login,
  googleSignIn,
});

export default AuthController;
