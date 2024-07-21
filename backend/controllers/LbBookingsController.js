import LbBooking from "../models/LbBookingsModel.js";

//for add or fetch
export const getLbBookingController = async (req, res) => {
    try {

        const lbBookings = await LbBooking.find();
        res.status(200).send(lbBookings);

    } catch(error) {
        console.log(error);
    }
}

//for add
export const addLbBookingController = async (req, res) => {

    try {
        console.log(req.body);
        const newLbBookings = new LbBooking(req.body);
        await newLbBookings.save();
        res.status(200).send("LbBookings Created Successfully!");

    } catch(error) {
        console.log(error);
    }

}



// //for update
// export const updateLbBookingController = async (req, res) => {
//     try {

//         await LbBooking.findOneAndUpdate({_id: req.body.lbBookingId}, req.body, {new: true})
//         res.status(201).json("LbBooking Updated!");
//     } catch(error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// }

// //for delete
// export const deleteLbBookingController = async (req, res) => {
//     try {

//         await LbBooking.findOneAndDelete({_id: req.body.lbBookingId})
//         res.status(200).json("LbBooking Deleted!");
//     } catch(error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// }