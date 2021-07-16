const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users.controller");

// no se ejecuta solo se pasa la referencia, para que el controlador lo ejecute
router.get("/", userGet);

router.post("/",[
  check('email', 'Email is not valid').isEmail()
], userPost);

//parametros de segmento
router.put("/:id", userPut);

router.delete("/:id", userDelete);

module.exports = router;
