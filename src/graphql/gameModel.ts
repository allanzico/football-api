import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { GraphQLDate } from "graphql-compose"
import GameEvent from "../mongo/GameEvent"
import Season from "../mongo/Season"
import Stage from "../mongo/Stage"
import Team from "../mongo/Team"
import Venue from "../mongo/Venue"
import { GameEventType } from "./gameEventModel"
import { StageType } from "./stageModel"
import { TeamType } from "./teamModel"
import { VenueType } from "./venueModel"


export const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        plannedKickoffTime: {type: GraphQLDate},
        sequence: {type: GraphQLInt},
        year: {type: GraphQLInt},
        stage: {type: StageType,
            resolve(source, args) {
                return Stage.findById(source.stageId)
            }
        },
        venue: {type: VenueType,
            resolve(source, args) {
                return Venue.findById(source.venueId)
            }
        },
        homeTeam: {type: TeamType,
            resolve(source, args) {
                return Team.findById(source.teamId)
            }
        },
        awayTeam: {type: TeamType,
            resolve(source, args) {
                return Team.findById(source.teamId)
            }
        },
        events: { type: new GraphQLList(GameEventType),
            resolve(source, args) {
                return GameEvent.find({gameEventId: source.id})
            }
        },
    })
})