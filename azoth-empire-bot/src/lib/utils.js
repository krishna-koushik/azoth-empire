class NWBotUtils {
    capitalize(stringTxt) {
        return stringTxt.charAt(0).toUpperCase() + stringTxt.slice(1);
    }

    async fetchDiscordUser(guild, user) {
        const allMembers = await guild.members.fetch();
        return allMembers.find(m => {
            return m.user.username === user.username;
        });
    }

    async fetchAllDiscordUser(guild) {
        return guild.members.fetch();
    }

    checkIfUserHasPermissions(roles, roleName) {
        return roles.some(role => role.name.toLowerCase() === roleName.toLowerCase());
    }
}

module.exports = new NWBotUtils();
