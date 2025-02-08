import express from "express";
import * as ServiceControllers from "../controllers/servicesController";

const router = express.Router();

router.route("/").post(ServiceControllers.createNewService);

export default router;
