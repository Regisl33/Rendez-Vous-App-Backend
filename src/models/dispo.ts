import mongoose, { InferSchemaType, model } from "mongoose";

const dispoSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
    roleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Service",
    },
    active: {
      type: Boolean,
      defaukt: true,
    },
  },
  { timestamps: true }
);

type dispo = InferSchemaType<typeof dispoSchema>;

export default model<dispo>("Dispo", dispoSchema);
