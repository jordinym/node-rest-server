const express = require("express");

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
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.send("Hello World!");
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor a su servicio en el puerto", this.port);
    });
  }
}

module.exports = Server;
