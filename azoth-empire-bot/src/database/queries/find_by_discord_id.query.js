const assert = require("assert");
class FindByDiscordIdQuery {
  constructor(discordId) {
    assert(discordId, "discordId is required.");
    this["discord.id"] = discordId;
  }
}

module.exports = FindByDiscordIdQuery;
