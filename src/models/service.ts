import mongoose, { InferSchemaType, model } from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    appointementMethod: {
      type: String,
      require: true,
    },
    appointementCategorie: {
      type: String,
      require: true,
    },
    baseService: {
      type: Boolean,
    },
    storeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
  },
  { timestamps: true }
);

type service = InferSchemaType<typeof serviceSchema>;

export default model<service>("Service", serviceSchema);
