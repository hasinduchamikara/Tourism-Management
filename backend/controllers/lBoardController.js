import path from "path";
import express from "express";
import LiveBoard from "../models/liveBoardsModel.js";
const Router = express.Router();
import cloudinary from "../utils/cloudinary.js";
import upload from "../utils/multer.js"

//Insert

Router.post(
  "/insert",
  upload.single("image"),
  async (req, res) => {
    console.log(req.body);
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      let liveboard = new LiveBoard({
        fname: req.body.fname,
        facilities: req.body.facilities,
        price: req.body.price,
        description: req.body.description,
        capacity: req.body.capacity,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      await liveboard.save();
      res.send("Book details uploaded successfully.");
    } catch (error) {
      res
        .status(400)
        .send("Error while uploading details. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

//Update
Router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let liveboard = await LiveBoard.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(liveboard.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      fname: req.body.fname || liveboard.fname,
      facilities: req.body.facilities || liveboard.facilities,
      price: req.body.price || liveboard.price,
      description: req.body.description || liveboard.description,
      capacity: req.body.capacity || liveboard.capacity,
      image: result?.secure_url || liveboard.image,
      cloudinary_id: result?.public_id || liveboard.cloudinary_id,
    };
    liveboard = await LiveBoard.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(liveboard);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//////////////////////////////////////

//Delete
Router.delete("/:id", async (req, res) => {
  try {
    // Find liveboard by id
    const liveboard = await LiveBoard.findById(req.params.id);
    if (!liveboard) throw Error("No file found");
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(liveboard.cloudinary_id);
    // Delete liveboard from db
    const removed = await liveboard.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the file");
    res.json(liveboard);
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

//Delete
Router.get("/:id", async (req, res) => {
  try {
    // Find liveboard by id
    const liveboard = await LiveBoard.findById(req.params.id);
    if (liveboard < 1) {
      return res.status(402).json({
          message: "No liveboard data found",
      });
  } else {
      res.status(200).json({
          success: true,
          code: 200,
          data: liveboard,
      });
  }
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});


export default Router;