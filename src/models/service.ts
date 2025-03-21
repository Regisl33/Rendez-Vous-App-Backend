import mongoose, { InferSchemaType, model } from "mongoose";
import Inc from "mongoose-sequence";

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
      default: true,
    },
    storeID: {
      type: [String],
    },
  },
  { timestamps: true }
);

const AutoIncrement = Inc(mongoose as any) as any;

serviceSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "serviceNum",
  start_Seq: 1,
});

type service = InferSchemaType<typeof serviceSchema>;

export default model<service>("Service", serviceSchema);
