import mongoose, { InferSchemaType, model } from "mongoose";

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
    holidays: {
      type: [Date],
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
    creationDate: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

type store = InferSchemaType<typeof storeSchema>;

export default model<store>("Store", storeSchema);
