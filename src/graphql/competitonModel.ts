import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import Season from "../mongo/Season"
import { SeasonType } from "./seasonsModel"


export const CompetitionType: any = new GraphQLObjectType({
    name: 'Competition',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        country: {type: GraphQLString},
        countryCode: {type: GraphQLString},
        seasons: { type: new GraphQLList(SeasonType),
            resolve(source, args) {
                return Season.find({competitionId: source.id})
            }
        },
    })
})