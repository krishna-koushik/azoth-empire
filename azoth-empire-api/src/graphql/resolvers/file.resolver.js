const WarFileApplicationModel = require('../../application/application-model/war-file.application.model');
const WarFileApplicationHandler = require('../../application/application-handlers/war-file.application.handler');
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        async warFiles(obj, args, context) {
            try {
                const { event: { requestContext } = {} } = context;
                if (!requestContext) {
                    return null;
                }

                const command = new WarFileApplicationModel(args);

                return WarFileApplicationHandler.handle(command);
            } catch (e) {
                console.error(e);
                throw new UserInputError(e.message);
            }
        },
    },
};
