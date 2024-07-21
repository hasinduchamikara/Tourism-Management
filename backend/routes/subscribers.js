import express from "express";
import Subscriber from "../models/subscriber.js";
import {
  allSubscriber,
  oneSubscriber,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber,
} from "../controllers/subscribers.js";

const router = express.Router();
// Getting all
router.get("/", allSubscriber);

// Getting One
router.get("/:id", getSubscriber, oneSubscriber);

// Creating one
router.post("/", createSubscriber);

// Updating One
router.patch("/:id", getSubscriber, updateSubscriber);

// Deleting One
router.delete("/:id", getSubscriber, deleteSubscriber);

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

export default router;
