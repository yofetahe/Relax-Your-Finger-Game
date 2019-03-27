const { Score, UserRegistration, Game } = require('./models');

module.exports = {

  getAllGames: (req, res) => {
    Game.find()
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },

  getAllLevelsGamesByGameId: (req, res) => {
    const ID = req.params.id;
    Game.find({_id: ID})
      .then(data => res.json(data))
      .catch(err => res.json(err))
  },

  addUser: (req, res) => {
    const DATA = req.body;
    console.log(DATA)
    // this.DATA.password = UserRegistration.setPassword(this.DATA.password);
    UserRegistration.create(DATA)
      .then(data => console.log(">>>> ", data) || res.json(data))
      .catch(err => console.log(err) || res.json(err));
  },

  getUserByUsername: (req, res) => {
    const DATA = req.body;    
    UserRegistration.findOne({ email: DATA.email, password: DATA.password })
      .then(data => {
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  createGame: (req, res) => {
    //////////// ADDING THE GAME /////////////////
    // GAME_NAME = req.body.game_name;
    // GAME_DESCRIPTION = req.body.game_description;
    Game.create({
        name: "Bubble Up",
        description: "This game is a typing speed. All the players will have a typing speed bar indicating their performance in percentage. The one who hit 100% win the game. And the others will keep typing till they reach 100%. Enjoy!!!"
      }).then(data => {
        console.log(data)
    });
  },

  createGameLevel: (req, res) => {
    ///////////// ADDING THE GAME LEVEL /////////////////
    const ID = req.params.id;
    // const LEVEL_NAME = req.body.level_name;
    Game.updateOne({_id: ID}, 
      {$push: {
        'level': {
          'name': 'LEVEL 1'
        }  
      }           
    }).then(data => console.log(data));
  },

  createGroupPerLevel: (req, res) => {    
    //////////////// ADDING THE GROUP /////////////////
    const ID = req.params.id;
    Game.updateOne({_id: ID},
      {$push: 
        {'level.0.created_group': {
          'name': req.body.name,
          'shedule_time': req.body.schedule,
          'group_member': [ ]
          }  
        }           
      }).then(data => {        
        
        Game.updateOne({_id: "5c9ada9d70712d2414b76064"}, 
          {$push: 
            {'level.0.created_group.0.group_memeber': [{
              'name': sessionStorage.getItem('name'), 
              'email': sessionStorage.getItem('email')
            }]
          }        
        }).then(result => {
          console.log(result)
          res.json(data);
        });

    });
  },

  addGroupMember: (req, res) => {
    ////////////// ADDING THE GROUP MEMBER /////////////////
    const ID = req.params.game_id;
    const LEVEL_INDEX = req.params.level_index;
    const GROUP_INDEX = req.params.group_index;
    
    push = {"$push": { }}
    push["$push"]['level.' + LEVEL_INDEX + '.created_group.' + GROUP_INDEX + '.group_memeber'] = {
      'name': req.body.name, 
      'email': req.body.email
    }

    Game.updateOne({_id: ID}, push).then(data => {
      console.log(data)
      res.json(data);
    });

  }




}