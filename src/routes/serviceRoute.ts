import express from "express";
import { createNewService } from "../controllers/servicesController";

const router = express.Router();

router.route("/").post(createNewService);

export default router;
