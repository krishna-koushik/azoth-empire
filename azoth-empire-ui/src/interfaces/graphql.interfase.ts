export interface IGraphQLQuery {
    operationName: string;
    variables: Object;
    query: string;
}

export function loginQuery(): IGraphQLQuery {
    return {
        operationName: 'loginToApp',
        variables: {},
        query: `query loginToApp {
            login
          }`,
    };
}
