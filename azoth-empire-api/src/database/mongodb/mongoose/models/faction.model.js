const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let factionSchema = new Schema({
  name: {
    type: String,
    index: true,
  },
});

module.exports = Mongoose.model('factions', factionSchema);
