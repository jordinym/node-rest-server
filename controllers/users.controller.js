const bcrypt = require("bcryptjs");
const {validationResult } = require('express-validator');

const User = require("../models/user");

const userGet = (req, res) => {
  const { name = "default", limit = "10", page = "1" } = req.query;
  res.status(200).json({
    msg: "Hello World! - GET",
    name,
    limit,
    page,
  });
};

const userPost = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

  const { name, email, password, role } = req.body;
  const userDb = new User({ name, email, password, role });
  
  
  try {

    //Validate unique email
    const existsEmail= await User.findOne({ email});
    if(existsEmail) {
      
      return res.status(400).json({
        msg: "Email already exists"
      });
    }

    // Encrypt password
    const sal = bcrypt.genSaltSync();
    userDb.password = bcrypt.hashSync(password, sal);

    await userDb.save();

    res.status(200).json({
      msg: "success",
      data:userDb,
    });
  } catch (error) {
    console.log(error);
  }
};

const userPut = (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    msg: "Hello World! - PUT",
    id,
  });
};

const userDelete = (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    msg: "Hello World! - DELETE",
    id,
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
