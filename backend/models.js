const mongoose = require('mongoose');

require('./dbConnection')(mongoose);

// const GameGroupSchema = new mongoose.Schema({
//     name: {type: String},
//     shedule_time: {type: String},
//     group_memeber: [
//         {
//             name: {type: String},
//             email: {type: String}
//         }
//     ]
// }, {timestamps: true})

// const GameLevelSchema = new mongoose.Schema({
//     name: { type: String },
//     created_group:[ { GameGroupSchema } ]
// })

const GameSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    level: [ { 
        name: { type: String },
        created_group:[ { 
            name: {type: String},
            shedule_time: {type: String},
            group_memeber: [{
                name: {type: String},
                email: {type: String}
            }] 
        }] 
    } ]
}, {timestamps: true})

const ScoreSchema = new mongoose.Schema({
    score_time: {type: String},
    game_level: {type: String},
    race_rank: {type: Number},
    total_player: {type: Number}
}, {timestamps: true})

const UserRegistrationSchema = new mongoose.Schema({
    name: {type: String, minlength: [3, "Your name should have at least three character"]},
    email: {type: String, required: [true, "Email is required"]},
    password: {type: String, required: [true, "Password is required"]},
    scores: [ ScoreSchema ]
}, {timestamps: true});

const Score = mongoose.model('Scores', ScoreSchema);
const UserRegistration = mongoose.model('UserRegistration', UserRegistrationSchema);
const Game = mongoose.model('Game', GameSchema);

module.exports = { Score, UserRegistration, Game };