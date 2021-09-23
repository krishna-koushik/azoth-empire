const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let guildSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
});

module.exports = Mongoose.model('guilds', guildSchema);
