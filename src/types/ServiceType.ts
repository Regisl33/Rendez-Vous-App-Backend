import mongoose, { Date } from "mongoose";

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
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type ReqStoreParamType = {
  currentStoreID: mongoose.Types.ObjectId;
};

export type ReqServParamType = {
  serviceID: mongoose.Types.ObjectId;
};

export type CreateReqBodyType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: string;
  appointementCategorie: string;
};

export type UpdateReqBodyType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: string;
  appointementCategorie: string;
  storeID?: mongoose.Types.ObjectId[];
};

export default ServiceType;
