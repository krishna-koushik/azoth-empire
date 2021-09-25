const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let companySchema = new Schema({
    name: {
        type: String,
        index: true,
    },
});

module.exports = Mongoose.model('companies', companySchema);
