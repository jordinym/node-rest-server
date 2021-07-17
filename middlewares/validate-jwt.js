const jwt = require("jsonwebtoken");
const User = require("../models/user");
 
const validateJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Invalid token",
    });
  }

  try {

    const {uid} = jwt.verify(token, process.env.SECRETOR_PRIVATE_KEY); //payload

    const user = await User.findById(uid);

    if(!user) {
        return res.status(401).json({
            msg: "Invalid token - user not exists", // - user not exists :: only for tests
          });
    }

    //Verify if the user is active
    if(!user.status) {
        return res.status(401).json({
            msg: "Invalid token - status", // - status :: only for tests
          });
    }

    req.user=user;

    next();

  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "Invalid token",
    });

  }
};

module.exports = {
  validateJWT,
};
