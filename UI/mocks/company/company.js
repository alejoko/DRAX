const companyData = require('./companyFixtures.js');
const sectorData = require('./sectorFixtures.js');
const productData = require('./productFixtures.js');

module.exports = app => app.get('/fastapi/company/:companyId', (request, response) => {
    const companyId = request.params.companyId;
    console.log('company', companyId);
    setTimeout(() => response.status(200).json(companyData.getCompanyById(companyId)), 1000);
});

module.exports = app => app.get('/fastapi/company/sector', (request, response) => setTimeout(() => response.status(200).json(sectorData.getSectors()), 1000));

module.exports = app => app.get('/fastapi/company/product', (request, response) => setTimeout(() => response.status(200).json(productData.getProducts()), 1000));