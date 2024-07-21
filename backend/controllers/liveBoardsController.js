import LiveBoard from "../models/liveBoardsModel.js";

//for add or fetch
export const getLiveBoardController = async (req, res) => {
    try {

        const liveboards = await LiveBoard.find();
        res.status(200).send(liveboards);

    } catch(error) {
        console.log(error);
    }
}

//for add
// export const addLiveBoardController = async (req, res) => {

//     try {

//         const newLiveBoards = new LiveBoard(req.body);
//         await newLiveBoards.save();
//         res.status(200).send("LiveBoards Created Successfully!");

//     } catch(error) {
//         console.log(error);
//     }

// }

//for update
export const updateLiveBoardController = async (req, res) => {
    try {

        await LiveBoard.findOneAndUpdate({_id: req.body.liveboardId}, req.body, {new: true})
        res.status(201).json("LiveBoard Updated!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}

//for delete
export const deleteLiveBoardController = async (req, res) => {
    try {

        await LiveBoard.findOneAndDelete({_id: req.body.liveboardId})
        res.status(200).json("LiveBoard Deleted!");
    } catch(error) {
        res.status(400).send(error);
        console.log(error);
    }
}