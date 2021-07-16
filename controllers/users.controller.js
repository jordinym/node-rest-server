const bcrypt = require("bcryptjs");

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
  const { name, email, password, role } = req.body;
  const userDb = new User({ name, email, password, role });

  try {
    // Encrypt password
    const sal = bcrypt.genSaltSync();
    userDb.password = bcrypt.hashSync(password, sal);

    await userDb.save();

    res.status(200).json({
      msg: "success",
      data: userDb,
    });
  } catch (error) {
    console.log(error);
  }
};

const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id,password, google, ...otherParams } = req.body;

  try {
    //validar contra BD
    if (password) {
      // Encrypt password
      const sal = bcrypt.genSaltSync();
      otherParams.password = bcrypt.hashSync(password, sal);
    }
    const userDb = await User.findByIdAndUpdate(id, otherParams);
    res.status(200).json({
      msg: "success",
      data: userDb,
    });
  } catch (error) {
    console.log(error);
  }
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
