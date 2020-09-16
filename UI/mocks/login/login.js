const data = require('./loginFixtures.js');

module.exports = app => app.get('/api/login', (req, res) => res.json(data.getLogin()));
