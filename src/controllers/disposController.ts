import { RequestHandler } from "express";
import DispoType, { CreateDispoReqType } from "../types/DispoType";
import CustomStatusError from "../configs/customStatusError";
import Dispo from "../models/dispo";
import { v4 as uuid } from "uuid";

export const createNewDispo: RequestHandler<
  unknown,
  unknown,
  CreateDispoReqType[],
  unknown
> = async (req, res, next) => {
  const { startDate, endDate, roleID, services } = req.body[0];

  try {
    if (req.body.length === 1) {
      if (!startDate || !endDate || !roleID || !services)
        throw new CustomStatusError("required data is missing", 400);

      const dispoArray: DispoType[] = await Dispo.find();
      const duplicate = dispoArray.filter((dispo) => dispo.roleID === roleID);

      const problem = duplicate.every(
        (dispo) =>
          (startDate > dispo.startDate && startDate < dispo.endDate) ||
          (endDate > dispo.startDate && endDate < dispo.endDate)
      );

      if (problem)
        throw new CustomStatusError(
          "Le Role est déja a l'horaire pour cette période",
          409
        );

      const dispo = await Dispo.create({
        startDate,
        endDate,
        roleID,
        services,
      });

      if (dispo) {
        res.status(201).json(dispo);
      } else {
        throw new CustomStatusError(
          "couldn't create dispo, invalid data received",
          400
        );
      }
    } else if (req.body.length === 0) {
      throw new CustomStatusError("required data is missing", 400);
    } else {
      const sequenceID = uuid();
      let requestArray: CreateDispoReqType[] = [];
      const dispoArray: DispoType[] = await Dispo.find();
      req.body.forEach((req) => {
        if (!startDate || !endDate || !roleID || !services)
          throw new CustomStatusError("required data is missing", 400);

        const duplicate = dispoArray.filter((dispo) => dispo.roleID === roleID);

        const problem = duplicate.every(
          (dispo) =>
            (startDate > dispo.startDate && startDate < dispo.endDate) ||
            (endDate > dispo.startDate && endDate < dispo.endDate)
        );

        if (problem)
          throw new CustomStatusError(
            "Le Role est déja a l'horaire pour cette période",
            409
          );

        requestArray.push(req)
      })





        const dispo = await Dispo.create({
          startDate,
          endDate,
          roleID,
          services,
        });

        if (dispo) {
          res.status(201).json(dispo);
        } else {
          throw new CustomStatusError(
            "couldn't create dispo, invalid data received",
            400
          );
        }
      };
    }
  } catch (err) {
    next(err);
  }
};
