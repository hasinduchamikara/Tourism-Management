// import { TokenExpiredError } from 'jsonwebtoken';
import mongoose from 'mongoose';

const reservationSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const reserve = mongoose.model('reserve', reservationSchema);

export default reserve;