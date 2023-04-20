import jsonwebtoken from "jsonwebtoken";

export const genJWT = (payload) => {
  const options = { expiresIn: "4h" };
  const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, secretOrPrivateKey, options, (error, token) => {
      return error
        ? reject({
            error,
            msg: "There has been an error generatint the token",
          })
        : resolve(token);
    });
  });
};

export const refreshJWT = (token) => {};
