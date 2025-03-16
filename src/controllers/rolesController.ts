import { RequestHandler } from "express";
import roleType from "../types/roleType";
import Role from "../models/role";
import { CreateRoleReqType, UpdateRoleReqType } from "../types/roleType";
import CustomStatusError from "../configs/customStatusError";

export const getRolesByStore: RequestHandler = async (req, res, next) => {
  const { currentStoreID } = req.params;
  try {
    const roles: roleType[] = await Role.find();
    const storeRoles = roles.filter(
      (role) => role.store === currentStoreID.slice(1)
    );
    const activeStoreRoles = storeRoles.filter((role) => role.active === true);
    res.status(200).json(activeStoreRoles);
  } catch (err) {
    next(err);
  }
};

export const getRoleByID: RequestHandler = async (req, res, next) => {
  const { roleID } = req.params;
  try {
    const currentRole = await Role.findOne({ id: roleID }).exec();
    res.status(200).json(currentRole);
  } catch (err) {
    next(err);
  }
};

export const createNewRole: RequestHandler<
  unknown,
  unknown,
  CreateRoleReqType,
  unknown
> = async (req, res, next) => {
  const { name, store, color } = req.body;

  try {
    if (!name || !store || !color)
      throw new CustomStatusError("required data is missing", 400);

    const rolesArray = await Role.find();
    const duplicate = rolesArray.filter(
      (role) => role.store === store && role.name === name
    );

    if (duplicate.length > 0)
      throw new CustomStatusError("A role with this name already exist", 409);

    const role = await Role.create({
      name,
      store,
      color,
    });

    if (role) {
      res.status(201).json(role);
    } else {
      throw new CustomStatusError(
        "couldn't create role, invalid data received",
        400
      );
    }
  } catch (err) {
    next(err);
  }
};

export const updateRole: RequestHandler<
  unknown,
  unknown,
  UpdateRoleReqType,
  unknown
> = async (req, res, next) => {
  const { id, name, store, color, active } = req.body;

  try {
    if (!id || !name || !store || !color || !active)
      throw new CustomStatusError("required data is missing", 400);

    const role = await Role.findOne({ id }).exec();

    if (!role) throw new CustomStatusError("service not found", 400);

    const rolesArray = await Role.find();
    const duplicate = rolesArray.filter(
      (role) => role.store === store && role.name === name
    );

    if (duplicate.length > 0 && duplicate[0].id !== id)
      throw new CustomStatusError("A role with this name already exist", 409);

    role.name = name;
    role.store = store;
    role.color = color;
    role.active = active;

    const updatedService = await role.save();

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
