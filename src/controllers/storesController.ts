import { RequestHandler } from "express";
import CustomStatusError from "../configs/customStatusError";
import Store from "../models/store";
import { CreateStoreReqType } from "../types/StoreTypes";

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
