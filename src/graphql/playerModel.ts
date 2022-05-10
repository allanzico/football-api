import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { GraphQLDate } from "graphql-compose"
import Team from "../mongo/Team"
import { TeamType } from "./teamModel"


export const PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        shirtName: {type: GraphQLString},
        dateOfBirth: {type: GraphQLDate},
        shirtNumber: {type: GraphQLInt},
        team: {type: TeamType,
            resolve(source, args) {
                return Team.findById(source.teamId)
            }
        },
    })
})