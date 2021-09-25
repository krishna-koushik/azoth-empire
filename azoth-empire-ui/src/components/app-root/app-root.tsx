import { Component, h } from '@stencil/core';
import { authService } from '../../services/auth.service';
import state from '../../stores/index';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
})
export class AppRoot {
    componentWillLoad() {
        if (!authService.isAuthenticated() && window.location.pathname !== '/login' && window.location.pathname !== '/discord/callback') {
            window.location.href = '/login';
        }
    }

    render() {
        return (
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url="/" component="app-home"></ion-route>
                    <ion-route url="/login" component="app-login"></ion-route>
                    {state.isLeader && !state.isInActive && <ion-route url="/wars" component="nw-wars"></ion-route>}
                    {state.isLeader && !state.isInActive && <ion-route url="/war/:warId" component="nw-war"></ion-route>}
                    {state.isLeader && !state.isInActive && <ion-route url="/members" component="nw-members"></ion-route>}
                    {state.isLeader && !state.isInActive && <ion-route url="/member/:memberId" component="nw-member"></ion-route>}
                    <ion-route url="/discord/callback" component="discord-callback"></ion-route>
                </ion-router>
                <ion-nav />
            </ion-app>
        );
    }
}
