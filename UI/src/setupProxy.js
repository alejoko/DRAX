module.exports = app => [
    '../mocks/login/login.js',
    '../mocks/logout/logout.js'
].forEach(mockHandlers => require(mockHandlers)(app));
