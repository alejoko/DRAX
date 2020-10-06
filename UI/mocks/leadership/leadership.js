const leadershipTeamData = require('./leadershipTeamFixtures.js');

module.exports = app => app.get('/fastapi/leadership/team/:companyId', (request, response) => {
    const companyId = request.params.companyId;
    setTimeout(() => response.status(200).json(leadershipTeamData.getLeadershipTeam(companyId)), 1000);
});