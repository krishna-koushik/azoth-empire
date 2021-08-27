import { Component, h, Prop, State } from '@stencil/core';

@Component({
    tag: 'nw-members',
    styleUrl: 'members.scss',
})
export class Members {
    @State() state = false;
    @Prop() name: string;

    componentDidLoad() {
        console.log(this);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Members</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <p>Members List</p>

                <ion-item>
                    <section class="section">
                        <h1 class="title">Member List</h1>
                        <h2 class="subtitle">List of New World members and the guilds they belong to</h2>
                        <div class="container">
                            <div class="block notification is-primary">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Guild</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <ion-router-link href="/member/1" routerDirection="forward" class="underline" color="primary">
                                                    Bodnapa
                                                </ion-router-link>
                                            </td>
                                            <td>Unbroken</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <ion-router-link href="/member/2" routerDirection="forward" class="underline" color="primary">
                                                    KIN
                                                </ion-router-link>
                                            </td>
                                            <td>PAX</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </ion-item>
            </ion-content>,
        ];
    }
}
