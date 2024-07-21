import express from 'express';

//const reservationsCtrl = require('../controllers/reservation_ctrl.js')
import {createReservations, getReservations, getReservationsByid, updateReservations, deleteReservation} from "../controllers/reservation_ctrl.js";

const router = express.Router();

router.post('/create', createReservations);
router.get('/getall', getReservations);
router.get('/getone/:id', getReservationsByid);
router.patch('/update/:id', updateReservations);
router.delete('/delete/:id', deleteReservation);

export default router;