import express from "express";
import * as StoreControllers from "../controllers/storesController";

const router = express.Router();

router.route("/").get(StoreControllers.getStores);
router.route("/:storeID").get(StoreControllers.getStoreInfoByID);
router.route("/").post(StoreControllers.createNewStore);
router.route("/").patch(StoreControllers.updateStore);

export default router;
