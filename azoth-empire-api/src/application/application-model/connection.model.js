const assert = require('assert');

class ConnectionModel {
    constructor(args) {
        const { first, last, after, before, orderBy } = args;

        assert(typeof first !== 'number' || typeof last !== 'number', 'You must provide either a "first" or "last" argument to properly paginate the connection.');

        assert(typeof first === 'number' && typeof last !== 'number', 'You must provide either a "first" or "last" argument to properly paginate the connection.');

        if (typeof first === 'number') {
            assert(first > 0, 'Argument "first" must be a non-negative integer');
        }

        if (typeof last === 'number') {
            assert(last > 0, 'Argument "last" must be a non-negative integer');
        }

        this.first = first;
        this.last = last;

        if (!!after) {
            this.after = after;
        }

        if (!!before) {
            this.before = before;
        }

        this.orderBy = orderBy;
    }
}

module.exports = ConnectionModel;
