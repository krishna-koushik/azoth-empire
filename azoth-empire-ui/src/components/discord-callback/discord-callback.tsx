import { Component, Host, h, State, Element } from '@stencil/core';
import { discordService } from '../../services/discord.service';

@Component({
    tag: 'discord-callback',
    styleUrl: 'discord-callback.scss',
    shadow: true,
})
export class DiscordCallback {
    @State() code;
    @State() username: string = '';
    @State() loggedinDiscordUserId: any;

    @Element() el;

    async componentWillLoad() {
        const urlSearchParams: any = new URLSearchParams(window.location.search);
        const { code } = Object.fromEntries(urlSearchParams.entries());
        this.code = code;
    }

    async componentDidLoad() {
        await this.getDiscordUser();
        // verify if the user has member access in Azoth Empire
        await this.getDiscordUserGuildPerms();

        this.redirectToHome();
    }

    redirectToHome() {
        // window.location.href = '/';
    }

    async getDiscordUser() {
        const token = await discordService.getOauthToken(this.code);
        const { id = '', username = '', discriminator = '' } = await discordService.getCurrentUser(token);

        if (!!username && !!discriminator) {
            this.username = `${username}#${discriminator}`;
            this.loggedinDiscordUserId = id;
        }
    }

    async getDiscordUserGuildPerms() {
        const token = await discordService.getOauthToken(this.code);
        console.log(await discordService.getOauthTokenMe(token));
        console.log(await discordService.getCurrentUserGuilds(this.code));
        // const response = await discordService.getAzothEmpireGuildPermsByUserId(token, this.loggedinDiscordUserId);
        //
        // console.log(response);
    }

    render() {
        return (
            <Host>
                {!this.username ? (
                    <ion-progress-bar type="indeterminate"></ion-progress-bar>
                ) : (
                    <ion-text color="secondary">
                        <h1>Welcome {this.username} to Azoth Empire App</h1>
                    </ion-text>
                )}
            </Host>
        );
    }
}
