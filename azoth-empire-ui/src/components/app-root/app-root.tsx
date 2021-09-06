import { Component, h, State } from '@stencil/core';
import { authService } from '../../services/auth.service';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
})
export class AppRoot {
    componentWillLoad() {
        if (!authService.isAuthenticated() && window.location.pathname !== '/login' && window.location.pathname !== '/discord/callback') {
            console.log(window.location.pathname);

            window.location.href = '/login';
        }
    }

    render() {
        return (
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url="/" component="app-home"></ion-route>
                    <ion-route url="/login" component="app-login"></ion-route>
                    <ion-route url="/attendance" component="war-attendance"></ion-route>
                    <ion-route url="/members" component="nw-members"></ion-route>
                    <ion-route url="/member/:memberId" component="nw-member"></ion-route>
                    <ion-route url="/discord/callback" component="discord-callback"></ion-route>
                </ion-router>
                <ion-nav />
            </ion-app>
        );
    }
}
