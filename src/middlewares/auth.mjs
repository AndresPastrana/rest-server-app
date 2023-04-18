// Middlewares for authorization and authentication

// Verify id_token for google
import { OAuth2Client } from "google-auth-library";

export const verifyGoogleToken = async (req, resp, next) => {
  const token = req.body.id_token;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_SECRET_ID;
  const client = new OAuth2Client(clientId, clientSecret);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      requiredAudience: clientId,
    });
    const payload = ticket.getPayload();
    req.user = payload;
    next();
  } catch (error) {
    return resp.status(400).json({
      error: "Invalid id_token",
    });
  }
};
