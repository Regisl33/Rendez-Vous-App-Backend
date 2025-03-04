import mongoose, { Date } from "mongoose";

export type AppointementMethod = "online" | "phone" | "none";
export type AppointementCategorie =
  | "Santé de la Bouche"
  | "Santé de la Femme"
  | "Santé de la Peau"
  | "Soin des Yeux"
  | "Santé Digestive"
  | "Santé Voyage"
  | "Santé des Oreilles"
  | "Soin des Pieds"
  | "Cholestérol"
  | "Diabète"
  | "Hypertension"
  | "Injection et Prélevements";

type ServiceType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: AppointementMethod;
  appointementCategorie: AppointementCategorie;
  baseService: boolean;
  storeID?: string[];
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
//Get Service by Store Request Param Type
export type ReqStoreParamType = {
  currentStoreID: string;
};
//Get Service by Id Request Param Type
export type ReqServParamType = {
  serviceID: string;
};
//Create Service Request Body Type
export type CreateReqBodyType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: string;
  appointementCategorie: string;
};
//Update Service Request Body Type
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
