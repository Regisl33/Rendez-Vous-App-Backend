import mongoose, { InferSchemaType, model } from "mongoose";
import Inc from "mongoose-sequence";

const dispoSchema = new mongoose.Schema(
  {
    startDate: {
      type: Number,
      require: true,
    },
    endDate: {
      type: Number,
      require: true,
    },
    roleID: {
      type: String,
      require: true,
    },
    services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Service",
    },
    sequenceID: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const AutoIncrement = Inc(mongoose as any) as any;

dispoSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "dispoNum",
  start_Seq: 1,
});

type dispo = InferSchemaType<typeof dispoSchema>;

export default model<dispo>("Dispo", dispoSchema);
