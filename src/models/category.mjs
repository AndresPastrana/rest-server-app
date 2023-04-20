import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
