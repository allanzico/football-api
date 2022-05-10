import mongoose from "mongoose";

const Schema = mongoose.Schema

const teamSchema = new Schema({
    name: String,
    nickname: String,
    manager: String,
    homeGroundName: String,
    country: String,
    city: String,
    venueId: String
})

export default mongoose.model('Team', teamSchema)