import mongoose from "mongoose";

const resortSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    created_at: {
        type: Date, default: Date.now()
    },
})

const resorts = mongoose.model('resorts', resortSchema);

export default resorts;
