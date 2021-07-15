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

router.put("/", userPut);

router.delete("/", userDelete);

module.exports = router;
