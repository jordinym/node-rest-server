const userGet = (req, res) => {
  res.status(200).json({ msg: "Hello World! - GET" });
};

const userPost = (req, res) => {
  res.status(200).json({ msg: "Hello World! - POST" });
};

const userPut = (req, res) => {
  res.status(200).json({ msg: "Hello World! - PUT" });
};

const userDelete = (req, res) => {
  res.status(200).json({ msg: "Hello World! - DELETE" });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete
};
