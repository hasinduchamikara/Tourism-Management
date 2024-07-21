import express from "express";
import {createResorts, getResorts, getResortsByid, updateResorts, deleteResort} from "../controllers/resorts_ctrl.js";
// const resCtrl = require("../controllers/resorts_ctrl")
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/')
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

router.post('/create', upload.array('photos' , 12 ), createResorts);
router.get('/getall', getResorts);
router.get('/getone/:id', getResortsByid);
router.patch('/update/:id', updateResorts);
router.delete('/delete/:id', deleteResort);

export default router;