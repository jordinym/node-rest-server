const userGet = (req, res) => {
  const {name='default',limit="10",page="1"}=req.query; 
  res.status(200).json(
    { 
      msg: "Hello World! - GET",
      name,
      limit,
      page,
   });
};

const userPost = (req, res) => {
  const body = req.body;

  res.status(200).json({
    msg: "Hello World! - POST",
    body,
  });
};

const userPut = (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    msg: "Hello World! - PUT",
    id,
  });
};

const userDelete = (req, res) => {
  const  id = req.params.id;
  res.status(200).json(
    { 
      msg: "Hello World! - DELETE" ,
      id
    });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
