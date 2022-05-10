import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { GraphQLDate } from "graphql-compose";
import Competition from "../mongo/Competition";
import Game from "../mongo/Game";
import GameEvent from "../mongo/GameEvent";
import Player from "../mongo/Player";
import Season from "../mongo/Season";
import Stage from "../mongo/Stage";
import Team from "../mongo/Team";
import Venue from "../mongo/Venue";
import { CompetitionType } from "./competitonModel";
import { GameEventType } from "./gameEventModel";
import { GameType } from "./gameModel";
import { PlayerType } from "./playerModel";
import { SeasonType } from "./seasonsModel";
import { StageType } from "./stageModel";
import { TeamType } from "./teamModel";
import { VenueType } from "./venueModel";

//Queries start here
export const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    /* competition queries */

    findCompetition: {
      type: CompetitionType,
      args: { id: { type: GraphQLID } },
      async resolve(source, args) {
        return Competition.findById(args.id);
      },
    },
    findCompetitions: {
      type: new GraphQLList(CompetitionType),
      resolve(source, args) {
        return Competition.find({});
      },
    },

    /* Season queries */
    findSeason: {
      type: SeasonType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Season.findById(args.id);
      },
    },
    findSeasons: {
      type: new GraphQLList(SeasonType),
      resolve(source, args) {
        return Season.find({});
      },
    },

    /* player queries  */
    findPlayer: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Player.findById(args.id);
      },
    },
    findPlayers: {
      type: new GraphQLList(PlayerType),
      resolve(source, args) {
        return Player.find({});
      },
    },

    /* Team Queries */
    findTeam: {
      type: TeamType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Team.findById(args.id);
      },
    },
    findTeams: {
      type: new GraphQLList(TeamType),
      resolve(source, args) {
        return Team.find({});
      },
    },
    /* Venue Queries */
    findVenue: {
      type: VenueType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Venue.findById(args.id);
      },
    },
    findVenues: {
      type: new GraphQLList(VenueType),
      resolve(source, args) {
        return Venue.find({});
      },
    },
    /* Game Event Queries */
    findEvent: {
      type: GameEventType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return GameEvent.findById(args.id);
      },
    },
    findEvents: {
      type: new GraphQLList(GameEventType),
      resolve(source, args) {
        return GameEvent.find({});
      },
    },
    /* Team Queries */
    findGame: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Game.findById(args.id);
      },
    },
    findGames: {
      type: new GraphQLList(GameType),
      resolve(source, args) {
        return Game.find({});
      },
    },
    /* Stage Queries */
    findStage: {
      type: StageType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Stage.findById(args.id);
      },
    },
    findStages: {
      type: new GraphQLList(StageType),
      resolve(source, args) {
        return Stage.find({});
      },
    },
  }),
});

//Mutation starts here
export const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    /* Competition Mutation */
    addCompetition: {
      type: CompetitionType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLString },
        countryCode: { type: GraphQLString },
        seasonId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(source, args) {
        let competition = new Competition({
          name: args.name,
          type: args.type,
          country: args.country,
          countryCode: args.countryCode,
          seasonId: args.seasonId,
        });
        return competition.save();
      },
    },

    /* Season Mutation */
    addSeason: {
      type: SeasonType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        competitionId: { type: GraphQLID },
      },
      resolve(source, args) {
        let season = new Season({
          name: args.name,
          year: args.year,
          competitionId: args.competitionId,
        });
        return season.save();
      },
    },

    /* Game Events Mutation */

    addGameEvent: {
      type: GameEventType,
      args: {
        clock: { type: GraphQLString },
        type: { type: GraphQLString },
        homeScore: { type: new GraphQLNonNull(GraphQLInt) },
        awayScore: { type: new GraphQLNonNull(GraphQLInt) },
        game: { type: GraphQLID },
        team: { type: GraphQLID },
        scorer: { type: GraphQLID },
        assist: { type: GraphQLID },
        playerIn: { type: GraphQLID },
        playerOut: { type: GraphQLID },
      },
      resolve(source, args) {
        let gameEvent = new GameEvent({
          clock: args.clock,
          type: args.type,
          homeScore: args.homeScore,
          awayScore: args.awayScore,
          game: args.game,
          team: args.team,
          scorer: args.scorer,
          assist: args.assist,
          playerIn: args.playerIn,
          playerOut: args.playerOut,
        });
        return gameEvent.save();
      },
    },

    /* Game Mutation */

    addGame: {
      type: GameType,
      args: {
        plannedKickoffTime: { type: GraphQLDate },
        sequence: { type: GraphQLInt },
        year: { type: GraphQLInt },
        stage: { type: GraphQLID },
        venue: { type: GraphQLID },
        homeTeam: { type: GraphQLID },
        awayTeam: { type: GraphQLID },
        events: { type: new GraphQLList(GraphQLID) },
      },
      resolve(source, args) {
        let game = new Game({
          plannedKickoffTime: args.plannedKickoffTime,
          sequence: args.sequence,
          year: args.year,
          stage: args.stage,
          venue: args.venue,
          homeTeam: args.homeTeam,
          awayTeam: args.awayTeam,
          events: args.events,
        });
        return game.save();
      },
    },
        /* Stage Mutation */

        addStage: {
            type: StageType,
            args: {
                startDate: {type: GraphQLDate},
                stopDate: {type: GraphQLDate},
                sequence: {type: GraphQLInt},
                year: {type: GraphQLInt},
                season: {type: GraphQLID},
                games: {type: new GraphQLList(GraphQLID)}
            },
            resolve(source, args) {
              let stage = new Stage({
                startDate: args.startDate,
                stopDate:args.stopDate,
                sequence: args.sequence,
                year: args.year,
                season: args.season,
                games: args.games
              });
              return stage.save();
            },
          },

              /* Team Mutation */

    addTeam: {
        type: TeamType,
        args: {
            name: {type: GraphQLString},
            nickname: {type: GraphQLString},
            manager: {type: GraphQLString},
            country: {type: GraphQLString},
            city: {type: GraphQLString},
            venue: {type: GraphQLID},
            players: {type: new GraphQLList(GraphQLID)}
        },
        resolve(source, args) {
          let team = new Team ({
            name: args.name,
            nickname: args.nickname,
            manager: args.manager,
            country: args.country,
            city: args.city,
            venue: args.venue,
            players: args.players
          });
          return team.save();
        },
      },
          /* Player Mutation */

    addPlayer: {
        type: PlayerType,
        args: {
            firstName: {type: GraphQLString},
            lastName: {type: GraphQLString},
            shirtName: {type: GraphQLString},
            dateOfBirth: {type: GraphQLDate},
            shirtNumber: {type: GraphQLInt},
            team: {type: GraphQLID}
        },
        resolve(source, args) {
          let player = new Player({
            firstName: args.firstName,
            lastName: args.lastName,
            shirtName: args.shirtName,
            dateOfBirth: args.dateOfBirth,
            shirtNumber: args.shirtNumber,
            team: args.team
          });
          return player.save();
        },
      },

/* Venue Mutation */
      addVenue: {
        type: VenueType,
        args: {
            name: {type: GraphQLString},
            country: {type: GraphQLString},
            city: {type: GraphQLString},
            teams: {type: new GraphQLList(GraphQLID)}
        },
        resolve(source, args) {
          let venue = new Venue({
            name: args.name,
            country: args.country,
            city: args.city,
            teams: args.team
          });
          return venue.save();
        },
      },
  },
});

export default new GraphQLSchema({ query: rootQuery, mutation: rootMutation });
