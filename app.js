require('dotenv').config();

const Server = require('./models/server');


const server= new Server();
 
//midelware 404
server.app.use((req, res) => {
  res.status(404).send("Error 404");
});

server.listen();


