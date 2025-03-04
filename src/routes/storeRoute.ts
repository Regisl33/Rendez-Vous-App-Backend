import express from "express";
import * as StoreControllers from "../controllers/storesController";

const router = express.Router();

router.route("/").post(StoreControllers.createNewStore);

export default router;
