const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../database/config");
const fileUpload = require("express-fileupload");//FileUpload

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

    //FileUpload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true //crea carpetas dentro del servidor
      }));
  }

  routes() {
    //AUTH Route
    this.app.use("/api/auth", require("../routes/auth.route"));

    //USER Route
    this.app.use("/api/users", require("../routes/users.route"));

    //CATEGORY Route
    this.app.use("/api/categories", require("../routes/categories.route"));

    //PRODUCT Route
    this.app.use("/api/products", require("../routes/products.route"));

    //SEARCH Route
    this.app.use("/api/search", require("../routes/search.route"));

    //UPLOAD Route
    this.app.use("/api/upload", require("../routes/uploads.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor a su servicio en el puerto", this.port);
    });
  }
}

module.exports = Server;
