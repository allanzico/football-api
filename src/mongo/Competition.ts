import mongoose from "mongoose";

const Schema = mongoose.Schema

const competitionSchema = new Schema({
    name: String,
    type: String,
    country: String,
    countryCode: String,
})

export default mongoose.model('Competition', competitionSchema)