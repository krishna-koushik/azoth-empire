const assert = require('assert');

class ServerInfoApplicationModel {
    constructor(authorization) {
        assert(authorization, 'Authorization is required. ');
        this.token = authorization;
    }
}

module.exports = ServerInfoApplicationModel;
