require('dotenv').config();

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World !!");
});

//midelware 404
app.use((req, res) => {
  res.status(404).send("Error 404");
});

app.listen(port, () => {
  console.log("servidor a su servicio en el puerto", port);
});
