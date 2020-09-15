export type Configuration = {
    identity: {
        password: {
            clientID: string;
            secret: string;
            prefix: string;
            scope: string;
            tokenEndPoint: string;
        }
    },
    endpoint: string;
}
const config: Configuration = {
    identity: {
        password: {
            clientID: 'passwrod.client',
            secret: 'secret',
            prefix: 'App',
            scope: '',
            tokenEndPoint: ''
        }
    },
    endpoint: 'https://localhost:3000/'
} as any;


export default config; 