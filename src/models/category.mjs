import { model, Schema } from "mongoose";
import { calculateTotalPages } from "../helpers/db.mjs";

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
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

CategorySchema.methods.toJSON = function () {
  const { _id, __v, state, ...rest } = this.toObject();
  return { ...rest, id: _id };
};

// Add teh sstatic method 'pagintion' to the CategoryModel class
CategorySchema.statics.pagination = async function (perPage, page, query) {
  let skip;
  const totalCategories = await this.count(query);
  const pages = calculateTotalPages(totalCategories, perPage);
  if (page > 0 && page != 1) {
    skip = (page - 1) * perPage;
  }

  if (page == 1 || page <= 0) {
    skip = 0;
  }

  return { totalCategories, pages, skip, page };
};

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
