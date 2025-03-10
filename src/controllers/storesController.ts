import { RequestHandler } from "express";
import CustomStatusError from "../configs/customStatusError";
import Store from "../models/store";
import { CreateStoreReqType, updateStoreReqType } from "../types/StoreTypes";
import StoreType from "../types/StoreTypes";
import { createNewService } from "./servicesController";

export const getStores: RequestHandler = async (req, res, next) => {
  try {
    const stores: StoreType[] = await Store.find();

    res.status(200).json(stores);
  } catch (err) {
    next(err);
  }
};

export const getStoreInfoByID: RequestHandler = async (req, res, next) => {
  const { storeID } = req.params;

  try {
    const currentStore = await Store.findOne({ id: storeID }).exec();

    res.status(200).json(currentStore);
  } catch (err) {
    next(err);
  }
};

export const createNewStore: RequestHandler<
  unknown,
  unknown,
  CreateStoreReqType,
  unknown
> = async (req, res, next) => {
  const {
    storeNumber,
    storeName,
    storeAdress,
    storeCity,
    storeCountry,
    storePhone,
    openingHours,
  } = req.body;

  try {
    if (
      !storeNumber ||
      !storeName ||
      !storeAdress ||
      !storeCity ||
      !storeCountry ||
      !storePhone ||
      !openingHours
    )
      throw new CustomStatusError("required data is missing", 400);

    const duplicate = await Store.findOne({ storeNumber, storeName })
      .lean()
      .exec();

    if (duplicate)
      throw new CustomStatusError(
        "A store with this name or number already exist",
        409
      );

    const store = await Store.create({
      storeNumber,
      storeName,
      storeAdress,
      storeCity,
      storeCountry,
      storePhone,
      openingHours: JSON.stringify(openingHours),
    });

    if (store) {
      res.status(201).json(store);
    } else {
      throw new CustomStatusError(
        "couldn't create store, invalid data received",
        400
      );
    }
  } catch (err) {
    next(err);
  }
};

export const updateStore: RequestHandler<
  unknown,
  unknown,
  updateStoreReqType,
  unknown
> = async (req, res, next) => {
  const {
    id,
    storeNumber,
    storeName,
    storeAdress,
    storeCity,
    storeCountry,
    storePhone,
    roles,
    openingHours,
    holiday,
    parameter,
    createNewService,
    active,
  } = req.body;

  try {
    if (
      !id ||
      !storeNumber ||
      !storeName ||
      !storeAdress ||
      !storeCity ||
      !storeCountry ||
      !storePhone ||
      !openingHours ||
      !parameter ||
      !createNewService ||
      !active
    )
      throw new CustomStatusError("required data is missing", 400);

    const store = await Store.findOne({ id }).exec();

    if (!store) throw new CustomStatusError("service not found", 400);

    const duplicate = await Store.findOne({ storeName, storeNumber }).exec();

    if (duplicate && duplicate.id !== id)
      throw new CustomStatusError(
        "A service with this name already exist",
        409
      );

    store.storeNumber = storeNumber;
    store.storeName = storeName;
    store.storeAdress = storeAdress;
    store.storeCity = storeCity;
    store.storeCountry = storeCountry;
    store.storePhone = storePhone;
    store.openingHours = JSON.stringify(openingHours);
    store.roles = roles ? roles : [];
    store.holidays = holiday ? holiday : [];
    store.parameter = parameter;
    store.createNewService = createNewService;
    store.active = active;

    const updatedStore = await store.save();

    if (updatedStore) {
      res.status(201).json(updatedStore);
    } else {
      throw new CustomStatusError(
        "couldn't create store, invalid data received",
        400
      );
    }
  } catch (err) {
    next(err);
  }
};
