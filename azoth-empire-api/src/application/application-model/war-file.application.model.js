const assert = require('assert');

class WarFileApplicationModel {
    constructor(args) {
        const { roster, stanbyList, rankings } = args;
        assert(roster, 'roster image file is required.');
        assert(stanbyList, 'stanbyList image files are required.');
        assert(rankings, 'rankings image files are required.');
        const { file: rosterFile } = roster;

        this.roster = rosterFile;
        this.stanbyList = stanbyList.map(s => {
            const { file: standbyFile } = s;
            return standbyFile;
        });
        this.rankings = rankings.map(r => {
            const { file: rankingFile } = r;
            return rankingFile;
        });
    }
}

module.exports = WarFileApplicationModel;
