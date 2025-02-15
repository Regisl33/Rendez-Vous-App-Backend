import { RequestHandler } from "express";
import Service from "../models/service";
import CustomStatusError from "../configs/customStatusError";
import ServiceType, {
  CreateReqBodyType,
  ReqServParamType,
  ReqStoreParamType,
  UpdateReqBodyType,
} from "../types/ServiceType";

export const getServices: RequestHandler = async (req, res, next) => {
  try {
    const services: ServiceType[] = await Service.find();

    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};

export const getServicesByStore: RequestHandler<
  ReqStoreParamType,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { currentStoreID } = req.params;
  try {
    const services: ServiceType[] = await Service.find();
    const baseServices = services.filter((serv) => serv.baseService === true);
    const storeCustomServices = services
      .filter((serv) => serv.baseService === false)
      .filter((ser) => ser.storeID?.includes(currentStoreID));
    const storeServices = [...baseServices, ...storeCustomServices];

    res.status(200).json({ services: storeServices });
  } catch (err) {
    next(err);
  }
};

export const getServicesByID: RequestHandler<
  ReqServParamType,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { serviceID } = req.params;

  try {
    const currentService = await Service.findOne({ _id: serviceID }).exec();

    res.status(200).json(currentService);
  } catch (err) {
    next(err);
  }
};

export const createNewService: RequestHandler<
  unknown,
  unknown,
  CreateReqBodyType,
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

export const updateNewService: RequestHandler<
  unknown,
  unknown,
  UpdateReqBodyType,
  unknown
> = async (req, res, next) => {
  const {
    _id,
    name,
    description,
    price,
    duration,
    appointementMethod,
    appointementCategorie,
    storeID,
  } = req.body;

  try {
    if (
      !_id ||
      !name ||
      !description ||
      !price ||
      !duration ||
      !appointementMethod ||
      !appointementCategorie
    )
      throw new CustomStatusError("required data is missing", 400);

    const service = await Service.findOne({ _id }).exec();

    if (!service) throw new CustomStatusError("service not found", 400);

    const duplicate = await Service.findOne({ name }).exec();

    if (duplicate && duplicate._id !== _id)
      throw new CustomStatusError(
        "A service with this name already exist",
        409
      );

    service.name = name;
    service.description = description;
    service.price = price;
    service.duration = duration;
    service.appointementMethod = appointementMethod;
    service.appointementCategorie = appointementCategorie;
    service.appointementCategorie = appointementCategorie;
    storeID ? (service.storeID = storeID) : null;

    const updatedService = await service.save();

    if (updatedService) {
      res.status(201).json(updatedService);
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
