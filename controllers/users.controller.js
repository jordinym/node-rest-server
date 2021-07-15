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
  const body = req.body;

  try {
    const userDb = new User(body);
    await userDb.save();

    res.status(200).json({
      msg: "Hello World! - POST",
      userDb,
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
