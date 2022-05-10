import mongoose from "mongoose";

const Schema = mongoose.Schema

const gameEventsSchema = new Schema({
    clock: String,
    type: String,
    homeScore: Number,
    awayScore: Number,
    gameId: String,
    teamId: String,
    playerId: String,
})

export default mongoose.model('GameEvents', gameEventsSchema)