import mongoose, { InferSchemaType, model } from "mongoose";
import Inc from "mongoose-sequence";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    store: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const AutoIncrement = Inc(mongoose as any) as any;

roleSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "roleNum",
  start_Seq: 1,
});

type role = InferSchemaType<typeof roleSchema>;

export default model<role>("Role", roleSchema);
