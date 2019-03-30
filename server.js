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
var clients = 0;

io.on("connection", socket => {

  var clientIpAddress= socket.request.socket.remoteAddress;
  // console.log(clientIpAddress)

  clients++;  
  socket.broadcast.emit("connected_user_number", clients);
  socket.on('disconnect', ()=>{
    clients--;
    socket.emit("connected_user_number", clients);
  }) 

  socket.on("pushStatusBarToServer", data => {    
    players.push(data);
    io.emit("getOthersStatusBar", players);
    socket.broadcast.emit("getOthersStatusBar", players);
  });

  // io.emit("getOthersStatusBar", Object.keys(players))
  socket.broadcast.emit("getOthersStatusBar", Object.keys(players));
  
});
