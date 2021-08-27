import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'nw-members',
  styleUrl: 'members.scss',
})
export class Members {
  @State() state = false;
  @Prop() name: string;

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
        <p>
          Members List
        </p>

        <ion-item>
          <section class="section">
            <h1 class="title">Member List</h1>
            <h2 class="subtitle">
              List of New World members and the guilds they belong to
            </h2>
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
                      <td><a href="#">Bodnapa</a></td>
                      <td>Unbroken</td>
                    </tr>
                    <tr>
                      <td><a href="#">KIN</a></td>
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
