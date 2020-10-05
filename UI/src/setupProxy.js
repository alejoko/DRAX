module.exports = app => [
    '../mocks/login/login.js',
    '../mocks/logout/logout.js',
    '../mocks/company/company.js'
].forEach(mockHandlers => require(mockHandlers)(app));
