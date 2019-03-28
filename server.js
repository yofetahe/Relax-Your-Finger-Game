const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
const server = app.listen(3000, () => { 
  console.log("Server is running on", server.address().port);
});
const io = require('socket.io').listen(server);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'))
app.use(session({
  secret: 'yofetahe',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))

require('./backend/routes')(app);

const players = []

io.on("connection", socket => {

  console.log("Socket connected");

  socket.on("pushStatusBarToServer", data => {    
    players.push(data);
    socket.emit("getOthersStatusBar", players);
  });

  io.emit("getOthersStatusBar", Object.keys(players))
});
