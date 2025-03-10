import mongoose, { InferSchemaType, model } from "mongoose";
import Inc from "mongoose-sequence";

const storeSchema = new mongoose.Schema(
  {
    storeNumber: {
      type: String,
      require: true,
    },
    storeName: {
      type: String,
      require: true,
    },
    storeAdress: {
      type: String,
      require: true,
    },
    storeCity: {
      type: String,
      require: true,
    },
    storeCountry: {
      type: String,
      require: true,
    },
    storePhone: {
      type: String,
      require: true,
    },
    roles: {
      type: [String],
    },
    openingHours: {
      type: String,
      require: true,
    },
    holidays: {
      type: [String],
    },
    parameter: {
      type: String,
      default: "1d",
    },
    createNewService: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const AutoIncrement = Inc(mongoose as any) as any;

storeSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "storeNum",
  start_Seq: 1,
});

type store = InferSchemaType<typeof storeSchema>;

export default model<store>("Store", storeSchema);
