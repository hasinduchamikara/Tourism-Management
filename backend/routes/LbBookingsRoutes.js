import express from "express";
import { getLbBookingController, addLbBookingController} from "../controllers/LbBookingsController.js";

const lbBookingRouter = express.Router();

lbBookingRouter.get("/getlbBookings", getLbBookingController);

lbBookingRouter.post("/addlbBookings", addLbBookingController);

// lbBookingRouter.put("/updatelbBookings", updateLbBookingController);

// lbBookingRouter.post("/deletelbBookings", deleteLbBookingController);

export default lbBookingRouter;