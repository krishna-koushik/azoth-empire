import { Component, h, Host, State } from '@stencil/core';
import { discordService } from '../../services/discord.service';

@Component({
    tag: 'app-login',
    styleUrl: 'app-login.scss',
    shadow: true,
})
export class AppLogin {
    @State() discordAuthUrl;

    componentWillLoad() {
        this.discordAuthUrl = discordService.buildDiscordLogin();
    }

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar color="primary">
                        <ion-title>Home</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <p>Login to the Azoth Empire App.</p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <ion-img src="/assets/icon/AE_Final.png"></ion-img>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-button href={this.discordAuthUrl} expand="block">
                                        Login Using Discord
                                    </ion-button>
                                </ion-item>
                                {/*<ion-item>*/}
                                {/*    <ion-label position="floating">Guilded Username</ion-label>*/}
                                {/*    <ion-input></ion-input>*/}
                                {/*</ion-item>*/}

                                {/*<ion-item>*/}
                                {/*    <ion-label position="floating">Guilded password</ion-label>*/}
                                {/*    <ion-input type="password"></ion-input>*/}
                                {/*</ion-item>*/}
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-content>
            </Host>
        );
    }
}
