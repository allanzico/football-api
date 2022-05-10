import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import Team from "../mongo/Team"
import { TeamType } from "./teamModel"



export const VenueType: any = new GraphQLObjectType({
    name: 'Venue',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        country: {type: GraphQLString},
        city: {type: GraphQLString},
        teams: { type: new GraphQLList(TeamType),
            resolve(source, args) {
                return Team.find({teamId: source.id})
            }
        },
    })
})