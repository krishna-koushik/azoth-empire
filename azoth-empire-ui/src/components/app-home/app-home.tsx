import { Component, h } from '@stencil/core';

@Component({
    tag: 'app-home',
    styleUrl: 'app-home.scss',
})
export class AppHome {
    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Home</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <p>Welcome to the Azoth Empire.</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-img src="/assets/icon/AE_Final.png"></ion-img>
                        </ion-col>
                        <ion-col>
                            <ion-button href="/members" expand="block">
                                Member List
                            </ion-button>
                            <ion-button href="/attendance" expand="block">
                                War Attendance
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-content>,
        ];
    }
}
