import { RequestHandler } from "express";
import Service from "../models/service";
import CustomStatusError from "../configs/customStatusError";

type reqBodyType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: string;
  appointementCategorie: string;
};

export const createNewService: RequestHandler<
  unknown,
  unknown,
  reqBodyType,
  unknown
> = async (req, res, next) => {
  const {
    name,
    description,
    price,
    duration,
    appointementMethod,
    appointementCategorie,
  } = req.body;

  try {
    if (
      !name ||
      !description ||
      !price ||
      !duration ||
      !appointementMethod ||
      !appointementCategorie
    )
      throw new CustomStatusError("required data is missing", 400);

    const duplicate = await Service.findOne({ name }).lean().exec();

    if (duplicate)
      throw new CustomStatusError(
        "A service with this name already exist",
        409
      );

    const service = await Service.create({
      name,
      description,
      price,
      duration,
      appointementMethod,
      appointementCategorie,
    });

    if (service) {
      res.status(201).json(service);
    } else {
      throw new CustomStatusError(
        "couldn't create service, invalid data received",
        400
      );
    }
  } catch (err) {
    next(err);
  }
};
