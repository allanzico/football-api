import mongoose from "mongoose";

const Schema = mongoose.Schema

const playerSchema = new Schema({
    firstName: String,
    lastName: String,
    shirtName: String,
    dateOfBirth: String,
    shirtNumber: Number,
    teamId: String
})

export default mongoose.model('Player', playerSchema)