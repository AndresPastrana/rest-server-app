import { request, response } from "express";
import CategoryModel from "../models/category.mjs";

const getCategories = async (req = request, resp = response) => {
  const { perPage = 5, page = 0 } = req.query;
  const query = { state: true };
  const {
    totalCategories,
    pages,
    skip,
    page: currentPage,
  } = await CategoryModel.pagination(perPage, page, query);
  const categories = await CategoryModel.find(query)
    .skip(skip)
    .limit(perPage)
    .populate("user", "name");

  return resp.status(200).json({
    data: {
      categories,
      pagination: {
        pages,
        currentPage,
        totalCategories,
        perPage,
      },
    },
  });
};

const getCategoryById = async (req = request, resp = response) => {
  try {
    const { category } = req;
    await category.populate("user", ["name"]);

    return resp.json({ category });
  } catch (error) {
    return resp.status(500).json({ error });
  }
};

const updateCategoryById = async (req = request, resp = response) => {
  try {
    const { user, category } = req;
    const { name } = req.body;

    if (name !== category.name) {
      category.name = name;
      category.user = user._id;
      await category.save();
    }
    return resp.json({ category });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ error });
  }
};

const deleteCategoryById = async (req = request, resp = response) => {
  try {
    const { user, category } = req;
    category.state = false;
    category.user = user._id;
    await category.save();
    return resp.json({ category });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({ msg: "Internal server error" });
  }
};

const insertCategory = async (req, resp) => {
  try {
    const { name = "" } = req.body;
    const { _id } = req.user;
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
    console.log(error);
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
