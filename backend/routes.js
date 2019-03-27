const controllers = require('./controllers');
const path = require('path');

module.exports = app => {

    app
        .get('/api/my_game', controllers.getAllGames)
        .get('/api/my_game/game/:id', controllers.getAllLevelsGamesByGameId)
        .post('/api/my_game', controllers.addUser)
        .post('/api/my_game/login', controllers.getUserByUsername)
        .post('/api/my_game/group/:id', controllers.createGroupPerLevel)
        .post('/api/my_game/joingroup/:game_id/:level_index/:group_index', controllers.addGroupMember)
        .all("*", (req,res,next) => {
            res.sendFile(path.resolve("./public/dist/public/index.html"))
        });
          
}