import express from "express";
import { getLiveBoardController, updateLiveBoardController, deleteLiveBoardController } from "../controllers/liveBoardsController.js";

const liveboardRouter = express.Router();

liveboardRouter.get("/getliveboards", getLiveBoardController);

// liveboardRouter.post("/addliveboards", addLiveBoardController);

liveboardRouter.put("/updateliveboards", updateLiveBoardController);

liveboardRouter.post("/deleteliveboards", deleteLiveBoardController);

export default liveboardRouter;