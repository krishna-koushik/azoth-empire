module.exports = {
    Query: {
        login(obj, args, context) {
            const { event: { requestContext } = {} } = context;
            if (!requestContext) {
                return null;
            }

            const { event: { requestContext: { credentials: { authToken = '', user } = {} } = {} } = {} } = context;
            console.log(`Login made by user Id ${user.id} - ${user.username}#${user.discriminator}`, { user });

            return authToken;
        },
    },
};
