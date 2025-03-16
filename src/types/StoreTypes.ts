import mongoose, { Date } from "mongoose";
import OpeningHoursType from "./OpeningHoursType";

type country =
  | "AB"
  | "BC"
  | "PE"
  | "MB"
  | "NB"
  | "NS"
  | "NU"
  | "ON"
  | "QC"
  | "SK"
  | "NL"
  | "YT"
  | "NT";

type StoreType = {
  _id: mongoose.Types.ObjectId;
  storeNumber: string;
  storeName: string;
  storeAdress: string;
  storeCity: string;
  storeCountry: country;
  storePhone: string;
  openingHours: OpeningHoursType;
  holiday?: string[];
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
  storeCountry: country;
  storePhone: string;
  openingHours: OpeningHoursType;
};

export type updateStoreReqType = {
  storeNumber: string;
  storeName: string;
  storeAdress: string;
  storeCity: string;
  storeCountry: country;
  storePhone: string;
  openingHours: OpeningHoursType;
  holiday?: string[];
  parameter: string;
  createNewService: boolean;
  active: boolean;
  id: number;
};

export default StoreType;
