import Package from "../models/packageBooking.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

// export const allPackage = async (req, res, next) => {
//   Package.find({ user: req.user.id })
//     .then((packages) => {
//       if (packages.length < 1) {
//         return res.status(402).json({
//           message: "No packages data availble",
//         });
//       } else {
//         return res.status(200).json({
//           success: true,
//           code: 200,
//           data: packages,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
export const allPackageuser = async (req, res, next) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const onePackage = (req, res) => {
//   let query = { _id: req.params.id };

//   Package.findOne(query)
//     .then((packages) => {
//       if (packages < 1) {
//         return res.status(402).json({
//           message: "No packages data found",
//         });
//       } else {
//         res.status(200).json({
//           success: true,
//           code: 200,
//           data: packages,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

// export const createPackage = asyncHandler(async (req, res) => {
//   if (!req.body.text) {
//     res.status(400);
//     throw new Error("Please add a text field");
//   }

//   const Newpackage = await Package.create({
//     text: req.body.text,
//     user: req.user.id,
//   });

//   res.status(200).json(Newpackage);
// });

export const createPackage = async (req, res) => {
  try {
    // const lrqDetails = { text: req.body, user: req.user.id };
    console.log(req.body);
    // // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);
    // // const newPackage = new Package(lrqDetails);
    const newPackage = new Package({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      user: req.user.id,
      // image: result.secure_url,
      // cloudinary_id: result.public_id,
    });

    await newPackage.save(function (err) {
      if (err) {
        console.log(err);
        res.status(600).json({
          message: "Error occur when creating newPackage.",
          error: err,
        });
        return;
      }
      res.status(201).json({
        message: "newPackage successfully created!",
        success: true,
      });
      return;
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Unable to create newPackage.",
      success: false,
    });
  }
};

// export const updatePackage = async (req, res) => {
//   let query = { _id: req.params.id };
//   const packagee = await Package.findById(req.params.id);
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error("No user ");
//   }

//   if (packagee.user.toString() !== user.id) {
//     res.status(401);
//     throw new Error(" user not authorized ");
//   }

//   Package.findOne(query)
//     .exec()
//     .then((found_packages) => {
//       if (found_packages < 1) {
//         return res.status(400).json({
//           message: "No data found",
//         });
//       } else {
//         if (req.body.name != null) {
//           found_packages.name = req.body.name;
//         }
//         if (req.body.description != null) {
//           found_packages.description = req.body.description;
//         }
//         if (req.body.price != null) {
//           found_packages.price = req.body.price;
//         }

//         // found_packages.updated_at = new Date();

//         found_packages.save((err, updated_object) => {
//           if (err) {
//             return next(err);
//           }

//           res.status(200).json({
//             success: true,
//             code: 200,
//             data: updated_object,
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

// export const deletePackage = async (req, res) => {
//   let query = { _id: req.params.id };
//   const packagee = await Package.findById(req.params.id);
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error("No user ");
//   }

//   if (packagee.user.toString() !== user.id) {
//     res.status(401);
//     throw new Error(" user not authorized ");
//   }
//   Package.findOne(query)
//     .exec()
//     .then((found_packages) => {
//       if (found_packages < 1) {
//         return res.status(402).json({
//           message: "No Package data found",
//         });
//       } else {
//         found_packages.remove((err, result) => {
//           if (err) {
//             return next(err);
//           }

//           res.status(200).json({
//             success: true,
//             code: 200,
//             data: result,
//           });
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };
