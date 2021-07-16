const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users.controller");
const { isValidRole, isExistsEmail, isExistsUserById } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

// no se ejecuta solo se pasa la referencia, para que el controlador lo ejecute
router.get("/", userGet);

//The validations are middlewares
router.post("/",[
  check('name', 'The name is required').notEmpty(),
  check('password', 'The password is required (minimum letters 6)').isLength({min:6}),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(isExistsEmail),
  //check('role', 'Role is not valid').isIn(["ADMIN_USER", "GUEST_USER"]),
  check('role').custom(isValidRole), // (rol)=>isValidRole(rol) -> isValidRole
  validateFields //custom middlewares
], userPost);

//Segment parameters
router.put("/:id",[
  check('id', 'The Id no is valid').isMongoId(), 
  check('id').custom(isExistsUserById),
  check('role').custom(isValidRole),
  validateFields //custom middlewares
], userPut);

router.delete("/:id", userDelete);

module.exports = router;
