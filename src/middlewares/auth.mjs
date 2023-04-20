// Middlewares for authorization and authentication
import { request, response } from "express";
import { OAuth2Client } from "google-auth-library";
import { verify } from "jsonwebtoken";

import UserModel from "../models/user.mjs";

export const verifyGoogleToken = async (req, resp, next) => {
  const token = req.body.id_token;

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET_ID
  );
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      requiredAudience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, picture, given_name: name } = payload;
    req.body = { email, picture, name };
    next();
  } catch (error) {
    console.log(error);
    return resp.status(400).json({
      error: "Invalid id_token",
    });
  }
};

export const verifyJWT = (req = request, resp = response, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return resp.status(401).json({ msg: "token is required" });
  }
  verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
    if (error) return resp.status(401).json({ msg: "No esta autorizado" });
    const user = await UserModel.findById(payload.uid);

    // If the user was really deleted
    if (!user) {
      return resp.status(401).json({ msg: "Invalid token" });
    }

    // If the user was disabled
    if (!user.state) {
      return resp.status(401).json({ msg: "This user has been blocked" });
    }
    req.user = user;
    next();
  });
};
