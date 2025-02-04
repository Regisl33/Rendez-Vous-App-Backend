import mongoose, { InferSchemaType, model } from "mongoose";

const appointementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    creationDate: {
      type: Date,
      require: true,
    },
    creationUser: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      defaukt: true,
    },
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    roleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  },
  { timestamps: true }
);

type appointement = InferSchemaType<typeof appointementSchema>;

export default model<appointement>("Appointement", appointementSchema);
