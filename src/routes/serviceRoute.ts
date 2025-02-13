import express from "express";
import * as ServiceControllers from "../controllers/servicesController";

const router = express.Router();

router.route("/").get(ServiceControllers.getServices);
router.route("/:currentStoreID").get(ServiceControllers.getServicesByStore);
router.route("/:serviceID").get(ServiceControllers.getServicesByID);
router.route("/").post(ServiceControllers.createNewService);
router.route("/").patch(ServiceControllers.updateNewService);

export default router;
