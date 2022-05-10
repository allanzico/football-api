import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { GraphQLDate } from "graphql-compose"
import Game from "../mongo/Game"
import Season from "../mongo/Season"
import { GameType } from "./gameModel"
import { SeasonType } from "./seasonsModel"


export const StageType: any = new GraphQLObjectType({
    name: 'Stage',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        startDate: {type: GraphQLDate},
        stopDate: {type: GraphQLDate},
        sequence: {type: GraphQLInt},
        year: {type: GraphQLInt},
        season: {type: SeasonType,
            resolve(source, args) {
                return Season.findById(source.seasonId)
            }
        },
        games: { type: new GraphQLList(GameType),
            resolve(source, args) {
                return Game.find({stageId: source.id})
            }
        },
    })
})