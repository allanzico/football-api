import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import Player from "../mongo/Player"
import Venue from "../mongo/Venue"
import { PlayerType } from "./playerModel"
import { VenueType } from "./venueModel"



export const TeamType: any = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        nickname: {type: GraphQLString},
        manager: {type: GraphQLString},
        country: {type: GraphQLString},
        city: {type: GraphQLString},
        venue: {type: VenueType,
            resolve(source, args) {
                return Venue.findById(source.venueId)
            }
        },
        players: { type: new GraphQLList(PlayerType),
            resolve(source, args) {
                return Player.find({playerId: source.id})
            }
        },

    })
})