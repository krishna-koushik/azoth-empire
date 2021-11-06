import { authService } from './auth.service';
import GraphqlInterface, { IGraphQLQuery } from '../interfaces/graphql.interface';
import RecursiveIterator from 'recursive-iterator';
import objectPath from 'object-path';

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
            body: JSON.stringify(GraphqlInterface.loginQuery()),
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

    async mutateUploadFiles(request: IGraphQLQuery) {
        let token: string = authService.getToken();
        const operations = {
            query: request.query,
            variables: JSON.parse(JSON.stringify(request.variables)),
        };

        const formData = new FormData();
        const fileDataArr = [];

        // formData.append("query", request.query);
        // formData.append("operationName", JSON.stringify(request.operationName || ''));
        // search for File objects on the request and set it as formData

        let mapObj = [];

        Object.keys(operations.variables).forEach(v => {
            operations.variables[v] = null;
        });
        // formData.append("variables", JSON.stringify(request.variables || {}));
        formData.append('operations', JSON.stringify(operations));
        //{"0": ["variables.rankings"],"1": ["variables.roster"],"2": ["variables.stanbyList"]}
        // formData.append("map", `{"0": ["variables.rankings"],"1": ["variables.roster"],"2": ["variables.stanbyList"]}`);

        let i = 0;
        for (let { node, path } of new RecursiveIterator(request.variables)) {
            let id = i;
            if (mapObj.length === i) {
                mapObj.push(`"${id}": ["variables.${path[0]}"]`);
            }
            if (node instanceof File) {
                // formData.append(`${id}`, node);
                fileDataArr.push({ id, node });
                objectPath.set(request.variables, path.join('.'), id);
                i++;
            }
        }

        formData.append('map', `{${mapObj.join(',')}}`);
        fileDataArr.forEach(({ id, node }) => {
            formData.append(`${id}`, node);
        });

        return await fetch(this.getUrl(), {
            headers: {
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'authorization': token,
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
            },
            body: formData,
            method: 'POST',
            mode: 'cors',
        }).then(response => response.json());
    }
}

export default new GraphQLService();
