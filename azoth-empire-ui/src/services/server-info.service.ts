import { authService } from './auth.service';

export class ServerInfoService {
    AE_SERVER_INFO_URL = window['__env__'].AE_SERVER_INFO_URL;
    getUrl() {
        if (!this.AE_SERVER_INFO_URL) {
            throw `The environment variable "window.__env__.AE_SERVER_INFO_URL" must be a url to the api endpoint.`;
        }

        return this.AE_SERVER_INFO_URL;
    }

    async getServerInfo() {
        let token: string = authService.getToken();

        return await fetch(this.getUrl(), {
            headers: {
                authorization: token,
            },
            method: 'GET',
            mode: 'cors',
        }).then(response => response.blob());
    }
}

export default new ServerInfoService();
