// Middlewares for authorization and authentication

// Verify id_token for google
import { OAuth2Client } from "google-auth-library";

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
