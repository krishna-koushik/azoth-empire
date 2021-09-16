const axios = require("axios").default;
const fs = require("fs");
const { DISCORD_REDIRECT_URI } = process.env;

const CLIENT_ID = fs
  .readFileSync("secrets/.client-id", "utf8")
  .toString()
  .trim();

const CLIENT_SECRET = fs
  .readFileSync("secrets/.client-secret", "utf8")
  .toString()
  .trim();

class DiscordRepository {
  async getOauthToken(code) {
    let token = null;
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: DISCORD_REDIRECT_URI,
    });

    try {
      const tokenRes = await axios.post(
        "https://discordapp.com/api/oauth2/token",
        params,
        {}
      );
      token = tokenRes.data.access_token;
    } catch (err) {
      console.error(err.response.data);
      return null;
    }

    return token;
  }

  async getCurrentUser(token) {
    try {
      const userRes = await axios.get(`https://discord.com/api/v6/users/@me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return userRes.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async getCurrentUserGuilds(token) {
    try {
      const userRes = await axios.get(
        `https://discord.com/api/v6/users/@me/guilds`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return userRes.data;
    } catch (err) {
      return err.response.data;
    }
  }

  async getCurrentUserGuilds(token) {
    try {
      const userRes = await axios.get(
        `https://discord.com/api/v6/users/@me/guilds`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return userRes.data;
    } catch (err) {
      return err.response.data;
    }
  }
}

module.exports = new DiscordRepository();
