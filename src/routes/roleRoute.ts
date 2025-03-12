import express from "express";
import * as RolesControllers from "../controllers/rolesController";

const router = express.Router();

router.route("/:currentStoreID").get(RolesControllers.getRolesByStore); //Used in Both Front End to get all the services for a store
router.route("/:roleID").get(RolesControllers.getRoleByID); //Used in Both Front End to get all the info about 1 service
router.route("/").post(RolesControllers.createNewRole); //Used only by the Store Front End to Create a Service
router.route("/:id").patch(RolesControllers.updateRole); //Used only by the Store Front End to Update a Service

export default router;
