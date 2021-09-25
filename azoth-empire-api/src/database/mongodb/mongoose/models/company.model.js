const Mongoose = require('mongoose');
const {
    Schema,
    Schema: {
        Types: { ObjectId },
    },
} = Mongoose;

let companySchema = new Schema({
    name: {
        type: String,
        index: true,
    },
    factionId: {
        type: ObjectId,
        ref: 'factions',
        index: true,
    },
    faction: String,
    guildId: {
        type: ObjectId,
        ref: 'guilds',
        index: true,
    },
    guild: String,
    active: {
        type: Boolean,
        default: true,
    },
});

module.exports = Mongoose.model('companies', companySchema);
