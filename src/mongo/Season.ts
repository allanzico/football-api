import mongoose from "mongoose";

const Schema = mongoose.Schema

const seasonSchema = new Schema({
    name: String,
    year: Number,
    competitionId: String,
})

export default mongoose.model('Season', seasonSchema)