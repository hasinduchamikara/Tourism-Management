import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import subscribersRouter from "./routes/subscribers.js";
import packagesRouter from "./routes/package.js";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import liveBoardsRouter from "./routes/liveboardsRoutes.js";
import LbBooking from "./routes/LbBookingsRoutes.js";
import lBoardRoute from "./controllers/lBoardController.js";

import resortsRoutes from "./routes/resortsRoute.js";
import reservationsRoute from './routes/reservationsRoute.js';
import packageBookingRoutes from "./routes/packageBooking.js";
// import multer from "multer";
import multer from "multer"
// const multer = require("multer");

// var bodyParser = require('body-parser');

import bodyParser from 'body-parser';
const app = express();

dotenv.config();
const PORT = process.env.PORT || "5000";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//routes
app.use("/subscribers", subscribersRouter);
app.use("/user", userRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/packagebooking", packageBookingRoutes);
app.use("/api/products/", productRouter);
app.use('/api/products/', productRouter);
app.use('/liveboard', liveBoardsRouter);
app.use('/lbBookings', LbBooking);
app.use("/lBoard", lBoardRoute);
app.use("/liveboard", liveBoardsRouter);
app.use("/lbBooings", LbBooking);
app.use("/api/resorts", resortsRoutes);
app.use('/api/reservations', reservationsRoute);

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
      cb(null, './uploads/products/')
  },
  filename: function (req, file, cb) {
      cb(null, new Date().getTime().toString() + "_" + file.originalname);
  }
})

const fileFiler = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      // accept
      cb(null, true)
  } else {
      // reject
      cb(new Error('message : file not acceptable'), false)
  }
}
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFiler
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(PORT, () =>
  console.log(`Server is up and running on https://localhost:${PORT}`)
);

