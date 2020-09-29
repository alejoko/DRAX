export interface GenericErrorPageConfig {
    forbiddenPath: string;
    notFoundPath: string;
    internalServerErrorPath: string;
};

const genericErrorPageConfig: GenericErrorPageConfig = {
    forbiddenPath: 'forbidden',
    notFoundPath: 'notfound',
    internalServerErrorPath: 'internalServerError'
};

export default genericErrorPageConfig;

