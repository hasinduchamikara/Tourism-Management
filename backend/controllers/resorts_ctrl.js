
// const Resorts = require('../models/resorts.js')
import Resorts from '../models/resorts.js';

//create resorts
export const createResorts = async (req, res) => {
    try {
        const lrqDetails = req;
        let images = [];
        for (var i = 0; i < req.files.length; i++) {
            images.push( req.files[i].path )
        }
        const newResorts = new Resorts({
            name: req.body.name,
            location: req.body.location,
            rooms: parseInt(req.body.rooms),
            stars: parseInt(req.body.stars),
            description: req.body.description,
            images: images.map(i => i.replace("\\", "/"))
        });

        await newResorts.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Error when creating resort.",
                    error: err
                });
            }
            return res.status(201).json({
                message: "Resort successfully registred!",
                success: true
            });
        });
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Unable to create resorts.",
            success: false
        });
    }
};

//get all resorts
export const getResorts = async function (req, res, next) {


    Resorts.find().then((resort) => {
        if (resort.length < 1) {
            return res.status(402).json({
                message: "No resorts data availble",
            });
        } else {

            return res.status(200).json({
                success: true,
                code: 200,
                data: resort
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

// update resortsType
export const updateResorts = async (req, res, next) => {
    let query = { _id: req.params.id }
    Resorts.findOne(query).exec().then(found_resorts => {
        if (found_resorts < 1) {
            return res.status(402).json({
                message: "No resortsType data found",
            });
        } else {
            if (req.body.name) { found_resorts.name = req.body.name }
            if (req.body.location) { found_resorts.location = req.body.location }
            if (req.body.rooms) { found_resorts.rooms = req.body.rooms }
            if (req.body.stars) { found_resorts.stars = req.body.stars }
            if (req.body.description) { found_resorts.description = req.body.description }
            if (req.body.images) { found_resorts.images = req.body.images }

            found_resorts.updated_at = new Date();

            found_resorts.save((err, updated_object) => {
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

//get resorts by id
export const getResortsByid = (req, res, next) => {

    let query = { _id: req.params.id }

    Resorts.findOne(query).then(resorts => {
        if (resorts < 1) {
            return res.status(402).json({
                message: "No resorts data found",
            });
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: resorts,
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
export const deleteResort = (req, res, next) => {

    let query = { _id: req.params.id }

    Resorts.findOne(query).exec().then(found_resorts => {
        if (found_resorts < 1) {
            return res.status(402).json({
                message: "No resorts data found",
            });
        } else {
            found_resorts.remove((err, result) => {
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