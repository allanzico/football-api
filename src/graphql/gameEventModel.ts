import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import Game from "../mongo/Game"
import Player from "../mongo/Player"
import Season from "../mongo/Season"
import Stage from "../mongo/Stage"
import Team from "../mongo/Team"
import { GameType } from "./gameModel"
import { PlayerType } from "./playerModel"
import { StageType } from "./stageModel"
import { TeamType } from "./teamModel"


export const GameEventType: any = new GraphQLObjectType({
    name: 'GameEvent',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID)},
        clock: {type: GraphQLString},
        type: {type: GraphQLString},
        homeScore: {type: GraphQLInt},
        awayScore: {type: GraphQLInt},
        game: {type: GameType,
            resolve(source, args) {
                return Game.findById(source.gameId)
            }
        },
        team: {type: TeamType,
            resolve(source, args) {
                return Team.findById(source.teamId)
            }
        },
        scorer: {type: PlayerType,
            resolve(source, args) {
                return Player.findById(source.playerId)
            }
        },
        assist: {type: PlayerType,
            resolve(source, args) {
                return Player.findById(source.playerId)
            }
        },
        playerIn: {type: PlayerType,
            resolve(source, args) {
                return Player.findById(source.playerId)
            }
        },
        playerOut: {type: PlayerType,
            resolve(source, args) {
                return Player.findById(source.playerId)
            }
        },
    })
})