import { request, response } from "express";
import { Types } from "mongoose";
import CategoryModel from "../models/category.mjs";
// TODO:
// 1 obtener todas categorias con la info del usuario paginado
const getCategories = (req = request, resp = response) => {
  try {
  } catch (error) {}
};
// 2 Obtener category by id in the search params
const getCategoryById = (req = request, resp = response) => {
  try {
  } catch (error) {}
};
// 3 Update category
const updateCategoryById = (req = request, resp = response) => {
  try {
  } catch (error) {}
};
// 4 Borrar category (change the state)
const deleteCategoryById = (req = request, resp = response) => {
  try {
  } catch (error) {}
};

// Insert category
const insertCategory = async (req, resp) => {
  try {
    const _id = new Types.ObjectId(req.user.uid);
    const { name = "" } = req.body;

    const newCategory = new CategoryModel({
      name,
      user: _id,
    });
    await newCategory.save();

    return resp.json({
      msg: "Success",
      data: newCategory,
    });
  } catch (error) {
    return resp.status(500).json({ msg: "Internal server error" });
  }
};

const CategoryController = Object.seal({
  insertCategory,
  getCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
});

export default CategoryController;
