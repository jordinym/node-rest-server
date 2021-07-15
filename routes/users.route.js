const express = require("express");
const router = express.Router();

const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users.controller");

// no se ejecuta solo se pasa la referencia, para que el controlador lo ejecute
router.get("/", userGet);

router.post("/", userPost);

//parametros de segmento
router.put("/:id", userPut);

router.delete("/:id", userDelete);

module.exports = router;
