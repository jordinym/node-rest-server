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

    //CORS
    this.app.use(cors());

    //Middleware para leer y parsear el body del request
    this.app.use(express.json()) // for parsing application/json
    this.app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    //Public directory
    this.app.use(express.static("public"));

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
