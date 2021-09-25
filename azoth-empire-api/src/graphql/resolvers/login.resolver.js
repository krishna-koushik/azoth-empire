const LoginApplicationModel = require('@application/application-model/login.application.model');
const LoginApplicationHandler = require('@application/application-handlers/login.application.handler');

module.exports = {
    Query: {
        login(obj, args, context) {
            const { event: { requestContext } = {} } = context;
            if (!requestContext) {
                return null;
            }

            const { event: { requestContext: { credentials: { authToken = '', user } = {} } = {} } = {} } = context;
            console.log(`Login made by user Id ${user.id} - ${user.username}#${user.discriminator}`, { user });

            const model = new LoginApplicationModel(authToken, user);
            return LoginApplicationHandler.handle(model);
        },
    },
};
