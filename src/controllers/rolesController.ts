import { RequestHandler } from "express";
import roleType from "../types/roleType";
import Role from "../models/role";

export const getRolesByStore: RequestHandler = async (req, res, next) => {
  const { currentStoreID } = req.params;
  try {
    const roles: roleType[] = await Role.find();
    const storeRoles = roles.filter((role) => role.store === currentStoreID);
    res.status(200).json(storeRoles);
  } catch (err) {
    next(err);
  }
};

export const getServicesByID: RequestHandler = async (req, res, next) => {
  const { roleID } = req.params;
  try {
    const currentRole = await Role.findOne({ id: roleID }).exec();
    res.status(200).json(currentRole);
  } catch (err) {
    next(err);
  }
};

// export const createNewService: RequestHandler<
//   unknown,
//   unknown,
//   CreateReqBodyType,
//   unknown
// > = async (req, res, next) => {
//   const {
//     name,
//     description,
//     price,
//     duration,
//     appointementMethod,
//     appointementCategorie,
//   } = req.body;

//   try {
//     if (
//       !name ||
//       !description ||
//       !price ||
//       !duration ||
//       !appointementMethod ||
//       !appointementCategorie
//     )
//       throw new CustomStatusError("required data is missing", 400);

//     const duplicate = await Service.findOne({ name }).lean().exec();

//     if (duplicate)
//       throw new CustomStatusError(
//         "A service with this name already exist",
//         409
//       );

//     const service = await Service.create({
//       name,
//       description,
//       price,
//       duration,
//       appointementMethod,
//       appointementCategorie,
//     });

//     if (service) {
//       res.status(201).json(service);
//     } else {
//       throw new CustomStatusError(
//         "couldn't create service, invalid data received",
//         400
//       );
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateNewService: RequestHandler<
//   unknown,
//   unknown,
//   UpdateReqBodyType,
//   unknown
// > = async (req, res, next) => {
//   const {
//     id,
//     name,
//     description,
//     price,
//     duration,
//     appointementMethod,
//     appointementCategorie,
//     storeID,
//   } = req.body;

//   try {
//     if (
//       !id ||
//       !name ||
//       !description ||
//       !price ||
//       !duration ||
//       !appointementMethod ||
//       !appointementCategorie
//     )
//       throw new CustomStatusError("required data is missing", 400);

//     const service = await Service.findOne({ id }).exec();

//     if (!service) throw new CustomStatusError("service not found", 400);

//     const duplicate = await Service.findOne({ name }).exec();

//     if (duplicate && duplicate.id !== id)
//       throw new CustomStatusError(
//         "A service with this name already exist",
//         409
//       );

//     service.name = name;
//     service.description = description;
//     service.price = price;
//     service.duration = duration;
//     service.appointementMethod = appointementMethod;
//     service.appointementCategorie = appointementCategorie;
//     service.appointementCategorie = appointementCategorie;
//     storeID ? (service.storeID = storeID) : null;

//     const updatedService = await service.save();

//     if (updatedService) {
//       res.status(201).json(updatedService);
//     } else {
//       throw new CustomStatusError(
//         "couldn't create service, invalid data received",
//         400
//       );
//     }
//   } catch (err) {
//     next(err);
//   }
// };
