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
    @State() triedToLogin: any = false;
    @State() token: string = null;

    @Element() el;

    async componentWillLoad() {
        const urlSearchParams: any = new URLSearchParams(window.location.search);
        const { code } = Object.fromEntries(urlSearchParams.entries());
        this.code = code;
    }

    async componentDidLoad() {
        try {
            this.token = await this.login(this.code);
        } catch (e) {
            console.error(e);
        }

        if (!!this.token) {
            this.redirectToHome();
        } else {
            this.redirectToLogin();
        }
    }

    redirectToHome() {
        window.location.href = '/';
    }

    redirectToLogin() {
        setTimeout(() => {
            authService.logout();
            window.location.href = '/login';
        }, 1000);
    }

    async login(code) {
        const {
            data: { login },
        } = await GraphQLService.login(code);
        if (!!login) {
            await authService.login(login);
        }

        return login;
    }

    render() {
        return (
            <Host>
                {!this.token && !this.triedToLogin ? (
                    <ion-text color="secondary">
                        <h1>You do not have permissions to use Azoth Empire App. Please contact Azoth Empire Leadership</h1>
                    </ion-text>
                ) : (
                    <ion-progress-bar type="indeterminate"></ion-progress-bar>
                )}
            </Host>
        );
    }
}
