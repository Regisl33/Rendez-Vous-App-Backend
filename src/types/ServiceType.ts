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
  storeID?: string[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type ReqStoreParamType = {
  currentStoreID: string;
};

export type ReqServParamType = {
  serviceID: string;
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
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: string;
  appointementCategorie: string;
  storeID?: string[];
};

export default ServiceType;
