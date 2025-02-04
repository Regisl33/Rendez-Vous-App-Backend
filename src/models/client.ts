import mongoose, { InferSchemaType, model } from "mongoose";

const clientSchema = new mongoose.Schema(
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
    active: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
    favoriteStore: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Store",
    },
  },
  { timestamps: true }
);

type client = InferSchemaType<typeof clientSchema>;

export default model<client>("Client", clientSchema);
