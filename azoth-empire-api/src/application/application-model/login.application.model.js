const assert = require('assert');

class LoginApplicationModel {
    constructor(authorization, user) {
        assert(authorization, 'Authorization is required. ');
        assert(user, 'User is required. ');
        assert(user.id, 'User.id is required. ');

        this.token = authorization;
        this.user = user;
    }
}

module.exports = LoginApplicationModel;
