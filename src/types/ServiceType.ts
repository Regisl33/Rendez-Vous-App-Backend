import mongoose, { Date, ObjectId } from "mongoose";

type ServiceType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: "online" | "phone" | "none";
  appointementCategorie: " ";
  baseService: boolean;
  storeID?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export default ServiceType;
