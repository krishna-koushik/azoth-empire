import { Component, h, Host, State } from '@stencil/core';
import serverInfoService from '../../services/server-info.service';
import { authService } from '../../services/auth.service';

@Component({
    tag: 'server-info',
    styleUrl: 'server-info.scss',
    shadow: true,
})
export class ServerInfo {
    @State() imageUrl: string = null;

    async componentWillLoad() {
        const imageUrl = serverInfoService.getUrl();
        let token: string = authService.getToken();
        this.imageUrl = `${imageUrl}?token=${token}`;
    }

    render() {
        return (
            <Host>
                <ion-content class="ion-padding">{!!this.imageUrl && <ion-img src={this.imageUrl}></ion-img>}</ion-content>
            </Host>
        );
    }
}
