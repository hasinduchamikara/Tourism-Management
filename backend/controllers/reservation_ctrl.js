import Reservations from '../models/reservation.js';

//create reservations
export const createReservations = async (req, res) => {
    try {
        const lrqDetails = req.body;
        const newReservations = new Reservations(lrqDetails);

        await newReservations.save(function (err) {
            if (err) {
                console.log(err);
                res.status(600).json({
                    message: "Error happend when creating reservations.",
                    error: err
                });
                return
            }
            res.status(201).json({
                message: "Reservations successfully registred!",
                success: true
            });
            return
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Unable to create reservations.",
            success: false
        });
    }
};

//get all reservations
export const getReservations = async function (req, res, next) {


    Reservations.find().then((reservation) => {
        if (reservation.length < 1) {
            return res.status(402).json({
                message: "No reservations data availble",
            });
        } else {

            return res.status(200).json({
                success: true,
                code: 200,
                data: reservation
            });
        }
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};

// update reservationsType
export const updateReservations = async (req, res, next) => {
    let query = { _id: req.params.id }
    Reservations.findOne(query).exec().then(found_reservations => {
        if (found_reservations < 1) {
            return res.status(402).json({
                message: "No reservationsType data found",
            });
        } else {
            if (req.body.name) { found_reservations.name = req.body.name }
            if (req.body.location) { found_reservations.location = req.body.location }
            if (req.body.rooms) { found_reservations.rooms = req.body.rooms }
            if (req.body.stars) { found_reservations.stars = req.body.stars }
            if (req.body.description) { found_reservations.description = req.body.description }
            if (req.body.images) { found_reservations.images = req.body.images }

            found_reservations.updated_at = new Date();

            found_reservations.save((err, updated_object) => {
                if (err) { return next(err) }

                res.status(200).json({
                    success: true,
                    code: 200,
                    data: updated_object,
                });
            })
        }

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
}

//get reservations by id
export const getReservationsByid = (req, res, next) => {

    let query = { _id: req.params.id }

    Reservations.findOne(query).then(reservations => {
        if (reservations < 1) {
            return res.status(402).json({
                message: "No reservations data found",
            });
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: reservations,
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
}


//delete employee
export const deleteReservation = (req, res, next) => {

    let query = { _id: req.params.id }

    Reservations.findOne(query).exec().then(found_reservations => {
        if (found_reservations < 1) {
            return res.status(402).json({
                message: "No reservations data found",
            });
        } else {
            found_reservations.remove((err, result) => {
                if (err) { return next(err) }

                res.status(200).json({
                    success: true,
                    code: 200,
                    data: result,
                });

            })

        }

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
}