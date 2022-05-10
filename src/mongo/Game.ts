import mongoose from "mongoose";

const Schema = mongoose.Schema

const gameSchema = new Schema({
    plannedKickoffTime: String,
    sequence: Number,
    year: Number,
    stageId: String,
    venueId: String,
    teamId: String,
    homeTeam: String,
    awayTeam: String
    
})

export default mongoose.model('Game', gameSchema)