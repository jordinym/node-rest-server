const express = require("express");
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middelware();
    this.routes();
  }

  middelware() {
    //Public directory
    this.app.use(express.static("public"));

    //CORS
    this.app.use(cors());
  }

  routes() {
    //USER Route
    this.app.use('/api/users',require('../routes/users.route'));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor a su servicio en el puerto", this.port);
    });
  }
}

module.exports = Server;
