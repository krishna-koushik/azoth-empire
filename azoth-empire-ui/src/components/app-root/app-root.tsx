import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
})
export class AppRoot {
    render() {
        return (
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url="/" component="app-home"></ion-route>
                    <ion-route url="/attendance" component="war-attendance"></ion-route>
                    <ion-route url="/members" component="nw-members"></ion-route>
                    <ion-route url="/member/:memberId" component="nw-member"></ion-route>
                </ion-router>
                <ion-nav />
            </ion-app>
        );
    }
}
