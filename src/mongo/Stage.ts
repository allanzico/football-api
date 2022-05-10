import mongoose from "mongoose";

const Schema = mongoose.Schema

const stageSchema = new Schema({
    startDate: String,
    stopDate: String,
    sequence: Number,
    year: Number,
    seasonId: String
})

export default mongoose.model('Stage', stageSchema)