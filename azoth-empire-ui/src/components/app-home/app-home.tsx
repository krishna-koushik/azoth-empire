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
        <p>Welcome to the Azoth Empire.</p>

        <ion-button href="/attendance" expand="block">
          War Attendance
        </ion-button>

        <ion-button href="/members" expand="block">
          Member List
        </ion-button>

      </ion-content>,
    ];
  }
}
