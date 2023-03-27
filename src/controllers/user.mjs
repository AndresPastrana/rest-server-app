import { request, response } from "express";

export const getUsers = (req = request, res = response) => {
  return res.send("<h1>Users enpoint ready</h1>");
};

export const postUser = (req = request, res = response) => {
  const { body } = req;
  return res
    .status(201)
    .send(`<p>Users enpoint ready ${JSON.stringify(body)}</p>`);
};

export const putUser = (req = request, res = response) => {
  const { params, body } = req;
  const { id } = params;

  return res
    .status(201)
    .send(`<p>Users enpoint ready ${(JSON.stringify(body), id)}</p>`);
};

export const deleteUser = (req = request, res = response) => {
  const { params } = req;
  const { id } = params;
  return res.send("<h1>Users enpoint ready</h1>");
};
