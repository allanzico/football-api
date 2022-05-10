import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import Competition from "../mongo/Competition"
import Stage from "../mongo/Stage"
import { CompetitionType } from "./competitonModel"
import { StageType } from "./stageModel"


export const SeasonType: any = new GraphQLObjectType({
    name: 'Season',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        year: {type: GraphQLInt},
        competiton: {type: CompetitionType,
            resolve(source, args) {
                return Competition.findById(source.competitionId)
            }
        },
        stages: { type: new GraphQLList(StageType),
            resolve(source, args) {
                return Stage.find({stageId: source.id})
            }
        },
    })
})