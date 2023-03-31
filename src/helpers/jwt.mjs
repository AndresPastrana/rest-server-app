import jsonwebtoken from "jsonwebtoken";

export const genJWT = (payload) => {
  const token = jsonwebtoken.sign(payload, process.env.SECTRET_KEY);
  console.log(token);
  return token;
};

export const refreshJWT = (token) => {};
