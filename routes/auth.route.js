const express = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth.controller");
const { isExistsEmail } = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");

const router = express.Router();

router.post("/login",[
    check('email', 'Email is not valid').isEmail(),
    check('password', 'The password is required').notEmpty(),
    //check('email').custom(isExistsEmail), 
    validateFields //custom middlewares
  ], login);

  module.exports = router;