import express from "express";
import * as DisposControllers from "../controllers/disposController";

const router = express.Router();

router.route("/").post(DisposControllers.createNewDispo);

export default router;
