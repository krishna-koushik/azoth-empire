const assert = require('assert');

class WarFileApplicationModel {
    constructor(args) {
        const { roster, stanbyList, rankings } = args;
        assert(roster, 'roster image file is required.');
        assert(stanbyList, 'stanbyList image files are required.');
        assert(rankings, 'rankings image files are required.');

        this.roster = roster;
        this.stanbyList = stanbyList;
        this.rankings = rankings;
    }
}

module.exports = WarFileApplicationModel;
