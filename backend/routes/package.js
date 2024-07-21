import express from "express";
import Package from "../models/package.js";
import {
  allPackage,
  onePackage,
  createPackage,
  updatePackage,
  deletePackage,
  allPackageuser,
} from "../controllers/package.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
// Getting all
router.get("/", protect, allPackage);
// Getting all
router.get("/all", allPackageuser);

// Getting One
router.get("/:id", protect, getPackage, onePackage);

// Creating one
router.post("/", protect, createPackage);

// Updating One
router.patch("/:id", protect, getPackage, updatePackage);

// Deleting One
router.delete("/:id", protect, getPackage, deletePackage);

async function getPackage(req, res, next) {
  let packagee;
  try {
    packagee = await Package.findById(req.params.id);
    if (packagee == null) {
      return res.status(404).json({ message: "Cannot find package" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.package = packagee;
  next();
}

export default router;
