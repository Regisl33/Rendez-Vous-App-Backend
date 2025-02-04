import mongoose, { InferSchemaType, model } from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      defaukt: true,
    },
  },
  { timestamps: true }
);

type role = InferSchemaType<typeof roleSchema>;

export default model<role>("Role", roleSchema);
