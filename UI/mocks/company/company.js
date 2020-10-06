const data = require('./companyFixtures.js');

module.exports = app => app.get('/fastapi/company/:companyId', (request, response) => {
    const {params : {companyId }} = request;
    setTimeout(() => response.status(200).json(data.getCompanyById(companyId)), 1000);
});

module.exports = app => app.get('fastapi/company/:companyId/sector', (request, response) => {
    const {params : {companyId }} = request;
    setTimeout(() => response.status(200).json(data.getSectors(companyId)), 1000);
});

module.exports = app => app.get('/fastapi/company/:companyId/product', (request, response) => {
    const {params : {companyId }} = request;
    setTimeout(() => response.status(200).json(data.getProducts(companyId)), 1000);
});

module.exports = app => app.get('/fastapi/company/:companyId/tags', (request, response) => {
    const {params : {companyId }} = request;
    setTimeout(() => response.status(200).json(data.getTags(companyId)), 1000);
});