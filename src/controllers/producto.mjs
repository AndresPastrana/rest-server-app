import { request, response } from "express";
import mongoose, { isValidObjectId, Types } from "mongoose";
import { pagination } from "../helpers/db.mjs";
import CategoryModel from "../models/category.mjs";
import ProductoModel from "../models/producto.mjs";

const getProductos = async (req = request, resp = response) => {
  try {
    const { perPage = 5, page = 1 } = req.query;
    const query = { state: true };

    const {
      totalDocs,
      pages,
      skip,
      page: currentPage,
    } = await pagination(ProductoModel, perPage, page, query);

    const productos = await ProductoModel.find(query)
      .populate("category", ["_id", "name"])
      .populate("user", ["_id", "name"])
      .limit(perPage)
      .skip(skip);

    return resp.json({
      productos,
      pagination: {
        totalDocs,
        pages,
        currentPage,
        perPage,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductoById = async (req = request, resp = response) => {
  try {
    const { id } = req.params;
    const product = await ProductoModel.findById(id)
      .populate("category", ["_id", "name"])
      .populate("user", ["_id", "name"])
      .exec();

    return resp.json({ data: product });
  } catch (error) {
    console.log(error);
    return resp.json({ msg: "error getting the product", error });
  }
};

const insertProducto = async (req = request, resp = response) => {
  try {
    const { user: authSUer, category: _id } = req;
    const { state, user, category, ...data } = req.body;

    //  TODO: validate category

    const newProduct = new ProductoModel(data);
    newProduct.user = authSUer._id;
    newProduct.category = _id;
    console.log(mongoose.isValidObjectId(_id));
    console.log(typeof newProduct.category);

    await newProduct.save();
    return resp.json({ producto: newProduct });
  } catch (error) {
    console.log("Error inserting a product");
    console.log(error);
  }
};

const updateProducto = async (req = request, resp = response) => {
  try {
  
    let { user: authUser, product } = req;
    const { user, category, state, ...rest } = req.body;

   

    if (category) {
      if (!isValidObjectId(category)) {
        return resp.status(400).json({ ok: false, msg: "Invalid category id" });
      }
      const cate = await CategoryModel.findById(new Types.ObjectId(category));
      if (!cate) {
        return resp.json({ msg: "Invalid category id" });
      }
      product.category = category;
    }

    const keys = Object.keys(rest);
    for (let i = 0; i < keys.length; i++) {
      const key_string = keys[i];
      product[key_string] = rest[key_string];
    }

    product.user = authUser._id;
    await product.save();
    return resp.json(product);
  } catch (error) {
    console.log(error);
    return resp.json({ msg: "Error updating the product", error });
  }
};

const deleteProductoById = async (req = request, resp = response) => {
  try {
    const { product } = req;
    product.state = false;
    await product.save();
 
    return resp.json( {ok : true, data: {_id: product._id}} );
  } catch (error) {
    console.log(error);
    return resp.json({ msg: "Error", error });
  }
};

const ProductoController = Object.seal({
  getProductos,
  getProductoById,
  insertProducto,
  updateProducto,
  deleteProductoById,
});

export default ProductoController;
