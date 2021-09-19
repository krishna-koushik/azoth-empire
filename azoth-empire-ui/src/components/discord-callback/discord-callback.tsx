import { Component, Host, h, State, Element } from '@stencil/core';
import { authService } from '../../services/auth.service';
import GraphQLService from '../../services/graphql.service';

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
        await this.login(this.code);
        this.redirectToHome();
    }

    redirectToHome() {
        window.location.href = '/';
    }

    async login(code) {
        const {
            data: { login },
        } = await GraphQLService.login(code);
        await authService.login(login);
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
