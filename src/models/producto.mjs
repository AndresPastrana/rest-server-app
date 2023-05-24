import { model, Schema } from "mongoose";

const Producto = new Schema({
  name: {
    type: String,
    required: [true, "The category name is required"],
    unique: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  precio: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  desc: {
    type: String,
  },
  aviable: {
    type: Boolean,
    default: true,
  },
});

Producto.methods.toJSON = function () {
  const { _id, __v, state, ...rest } = this.toObject();
  return { id: _id,...rest };
};


const ProductoModel = model("Producto", Producto);

export default ProductoModel;
