import mongoose from "mongoose";

const Schema = mongoose.Schema

const venueSchema = new Schema({
    name: String,
    country: String,
    city: String
})

export default mongoose.model('Venue', venueSchema)