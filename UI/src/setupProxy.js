module.exports = app => [
    '../mocks/login/logout.js',
    '../mocks/logout/logout.js'
].forEach(mockHandlers => require(mockHandlers)(app));
