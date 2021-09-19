import { authService } from './auth.service';
import { IGraphQLQuery, loginQuery } from '../interfaces/graphql.interfase';

export class GraphQLService {
    AE_API_URL = window['__env__'].AE_API_URL;

    constructor() {}

    getUrl() {
        if (!this.AE_API_URL) {
            throw `The environment variable "window.__env__.AE_API_URL" must be a url to the api endpoint.`;
        }

        return this.AE_API_URL;
    }

    async login(code: string) {
        return await fetch(this.getUrl(), {
            headers: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'x-token-code': code,
                'content-type': 'application/json',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
            },
            body: JSON.stringify(loginQuery()),
            method: 'POST',
            mode: 'cors',
        }).then(response => response.json());
    }

    async query(query: IGraphQLQuery) {
        let token: string = authService.getToken();

        return await fetch(this.getUrl(), {
            headers: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'authorization': token,
                'content-type': 'application/json',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
            },
            body: JSON.stringify(query),
            method: 'POST',
            mode: 'cors',
        }).then(response => response.json());
    }
}

export default new GraphQLService();
