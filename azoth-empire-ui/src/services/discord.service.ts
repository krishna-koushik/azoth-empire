import axios from 'axios';

const CLIENT_ID = '######';
const CLIENT_SECRET = '######';
const REDIRECT_URI = 'https%3A%2F%2Flocalhost%3A3333%2Fdiscord%2Fcallback';
const AZOTH_EMPIRE_GUILD_ID = '#####';
const BOT_TOKEN = '#######';
class DiscordService {
    constructor() {}
    buildDiscordLogin(isBotAuth = false) {
        if (!!isBotAuth) {
            return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds%20bot%20applications.commands`;
        } else {
            return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=identify%20guilds`;
        }
    }

    async getOauthToken(code: string) {
        let token = null;
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://localhost:3333/discord/callback',
        });

        if (!sessionStorage.getItem('ae_token')) {
            try {
                const tokenRes = await axios.post('https://discordapp.com/api/oauth2/token', params, {});
                token = tokenRes.data.access_token;

                sessionStorage.setItem('ae_token', token);
            } catch (err) {
                return err.response.data;
            }
        } else {
            token = sessionStorage.getItem('ae_token');
        }

        return token;
    }

    async getOauthTokenMe(token) {
        try {
            const userRes = await axios.get(`https://discord.com/api/v6/oauth2/@me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return userRes.data;
        } catch (err) {
            return err.response.data;
        }
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
            const userRes = await axios.get(`https://discord.com/api/v6/users/@me/guilds`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return userRes.data;
        } catch (err) {
            return err.response.data;
        }
    }

    async getAzothEmpireGuildPermsByUserId(token, userId) {
        try {
            const userRes = await axios.get(`https://discord.com/api/v6/guilds/${AZOTH_EMPIRE_GUILD_ID}/members/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return userRes.data;
        } catch (err) {
            return err.response.data;
        }
    }
}
const discordService = new DiscordService();
export { discordService };
