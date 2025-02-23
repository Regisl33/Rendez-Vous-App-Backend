import express from "express";
import * as ServiceControllers from "../controllers/servicesController";

const router = express.Router();

router.route("/").get(ServiceControllers.getServices);
router.route("/:currentStoreID").get(ServiceControllers.getServicesByStore);
router.route("/modif/:serviceID").get(ServiceControllers.getServicesByID);
router.route("/").post(ServiceControllers.createNewService);
router.route("/:id").patch(ServiceControllers.updateNewService);

export default router;
