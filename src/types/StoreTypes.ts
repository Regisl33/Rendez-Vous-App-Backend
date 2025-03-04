import mongoose, { Date } from "mongoose";
import OpeningHoursType from "./OpeningHoursType";

type StoreType = {
  _id: mongoose.Types.ObjectId;
  storeNumber: string;
  storeName: string;
  storeAdress: string;
  storeCity: string;
  storeCountry: string;
  storePhone: string;
  roles?: string[];
  openingHours: OpeningHoursType;
  holiday?: Date[];
  parameter: string;
  createNewService: boolean;
  active: boolean;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
//Create Store Request Body Type
export type CreateStoreReqType = {
  storeNumber: string;
  storeName: string;
  storeAdress: string;
  storeCity: string;
  storeCountry: string;
  storePhone: string;
  openingHours: OpeningHoursType;
};

export default StoreType;
