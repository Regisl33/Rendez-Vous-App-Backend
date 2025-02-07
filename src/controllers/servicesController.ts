import { Request, Response } from "express";
import Service from "../models/service";

type reqBodyType = {
  name: string;
  description: string;
  price: number;
  duration: number;
  appointementMethod: string;
  appointementCategorie: string;
};

export const createNewService = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    duration,
    appointementMethod,
    appointementCategorie,
  }: reqBodyType = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !duration ||
    !appointementMethod ||
    !appointementCategorie
  )
    return res.status(400).json({ message: "required data is missing" });

  const duplicate = await Service.findOne({ name }).lean().exec();

  if (duplicate)
    return res
      .status(409)
      .json({ message: "A service with this name already exist" });

  const service = await Service.create({
    name,
    description,
    price,
    duration,
    appointementMethod,
    appointementCategorie,
  });

  if (service) {
    return res.status(201).json({ message: "New service created", service });
  } else {
    return res
      .status(400)
      .json({ message: "couldn't create service, invalid data received" });
  }
};
