import express from "express";
import * as ServiceControllers from "../controllers/servicesController";

const router = express.Router();

router.route("/").get(ServiceControllers.getServices); //Will only be used by the Client Front End
router.route("/:currentStoreID").get(ServiceControllers.getServicesByStore); //Used in Both Front End to get all the services for a store
router.route("/modif/:serviceID").get(ServiceControllers.getServicesByID); //Used in Both Front End to get all the info about 1 service
router.route("/").post(ServiceControllers.createNewService); //Used only by the Store Front End to Create a Service
router.route("/:id").patch(ServiceControllers.updateNewService); //Used only by the Store Front End to Update a Service

export default router;
