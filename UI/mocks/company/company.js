const data = require('./companyFixtures.js');

module.exports = app => app.get('/fastapi/company/:companyId', (request, response) => {
    const companyId = request.params.companyId;
    console.log('company', companyId);
    setTimeout(() => response.status(200).json(data.getCompanyById(companyId)), 1000);
});