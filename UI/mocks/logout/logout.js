const data = require('./logoutFixtures.js');

module.exports = app => app.get('/api/logout', (req, res) => res.json(data.getLogin()));
