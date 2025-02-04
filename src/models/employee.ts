import mongoose, { InferSchemaType, model, mongo } from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
    authorizedStore: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Store",
    },
  },
  { timestamps: true }
);

type employee = InferSchemaType<typeof employeeSchema>;

export default model<employee>("Employee", employeeSchema);
