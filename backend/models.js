const mongoose = require('mongoose');
const crypto = require('crypto');

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

// UserRegistrationSchema.methods.setPassword = (password) => {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// }

// UserRegistrationSchema.methods.validPassword = (password) => {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
// }

const Score = mongoose.model('Scores', ScoreSchema);
const UserRegistration = mongoose.model('UserRegistration', UserRegistrationSchema);
const Game = mongoose.model('Game', GameSchema);

module.exports = { Score, UserRegistration, Game };