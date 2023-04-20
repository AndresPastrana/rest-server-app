import { Schema, model, Types } from "mongoose";
import { calculateTotalPages } from "../helpers/db.mjs";
// This will be the model that will interact with the ORM of our choice
// sequilize , mongoose , etc

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "The field name is required in collection users"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  url_avatar: {
    type: String,
    default: "",
  },
  role: {
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId("643f4a3f4ee8a98ff8f58906"),
    rel: "Role",
  },

  // Nos dice si el usauario esta activo o no
  state: {
    type: Boolean,
    default: true,
  },
  // Nos dice si el usuario creo su cuenta using Google
  google: {
    type: Boolean,
    default: false,
  },
});

// UserSchema.methods("toJSON", () => {});
UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  return { uid: _id, ...user };
};

UserSchema.statics.pagination = async function (perPage, page, query) {
  let skip;
  const totalUsers = await this.count(query);
  const pages = calculateTotalPages(totalUsers, perPage);

  if (page > 0 && page != 1) {
    skip = (page - 1) * perPage;
  }

  if (page == 1 || page <= 0) {
    skip = 0;
  }

  return { totalUsers, pages, skip, page };
};

const UserModel = model("User", UserSchema);

export default UserModel;
