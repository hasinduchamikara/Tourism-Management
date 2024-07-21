import mongoose from "mongoose";

//for create table into db
const lbBookingSchema = new mongoose.Schema({

    booingID: { type: String },
    email: { type: String },
    facilities: { type: String},
    contact: { type: String },
    lbName: { type: String},
    date: { type: String},
    hours: { type: Number},
    amount: { type: Number},
    fType: { type: String},
    count: { type: Number},
    spRequirement: { type: String},
    


}, {
    //for date
    timestamps: true
});

const LbBooking = mongoose.model("LbBooking", lbBookingSchema);
export default LbBooking;