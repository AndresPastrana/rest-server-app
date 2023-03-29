import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  role_name: {
    type: String,
    unique: true,
    required: [true, "role_name is required"],
  },
});

// SchemaName.methdos.methodName
// Se usa para definir un metodo en cada instancia de un modelo
// const a = new Model({})
// a.methodName();
RoleSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();
  return { id: _id, ...rest };
};

// SchemaName.statics.methodName
// Se usa para definir metodos estaticos en el modelo
// ModelName.methodName()

const RoleModel = model("Role", RoleSchema);

export default RoleModel;
