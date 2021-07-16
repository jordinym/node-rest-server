const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    //Conectar DB
    this.connectDB();

    this.middelware();
    this.routes();
  }

  async connectDB() {
    await dbConecction();
  }

  middelware() {
    //CORS
    this.app.use(cors());

    //Middleware para leer y parsear el body del request
    this.app.use(express.json()); // for parsing application/json
    this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    //Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    //AUTH Route
    this.app.use("/api/auth", require("../routes/auth.route"));

    //USER Route
    this.app.use("/api/users", require("../routes/users.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor a su servicio en el puerto", this.port);
    });
  }
}

module.exports = Server;
