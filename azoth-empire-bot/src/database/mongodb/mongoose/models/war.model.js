const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const {
    Types: { ObjectId },
} = Schema;

let warSchema = new Schema({
    companies: [
        new Schema({
            companyId: {
                type: ObjectId,
                ref: 'companies',
                index: true,
            },
            name: String,
            faction: String,
            factionId: {
                type: ObjectId,
                ref: 'factions',
                index: true,
            },
            role: String,
            outcome: String,
        }),
    ],
    warType: {
        type: String,
        enum: ['INVASION', 'WAR'],
        default: 'WAR',
        index: true,
    },
    location: {
        type: String,
        index: true,
    },
    time: {
        type: Date,
        index: true,
        default: Date.now(),
    },
    army: [
        new Schema({
            playerId: {
                type: ObjectId,
                ref: 'players',
                index: true,
            },
            group: {
                type: String,
                enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'STANDBY'],
                default: 'STANDBY',
            },
        }),
    ],
    performance: [
        new Schema({
            playerId: {
                type: ObjectId,
                ref: 'players',
                index: true,
            },
            rank: {
                type: Number,
                default: 0,
            },
            score: {
                type: Number,
                default: 0,
            },
            kills: {
                type: Number,
                default: 0,
            },
            assists: {
                type: Number,
                default: 0,
            },
            deaths: {
                type: Number,
                default: 0,
            },
            healing: {
                type: Number,
                default: 0,
            },
            damage: {
                type: Number,
                default: 0,
            },
        }),
    ],
});

module.exports = Mongoose.model('wars', warSchema);
