const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt-generator");

const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  let message = "";
  try {
    //Verify if email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "The username/password are not correct - email", // - email :: only for tests
      });
    }

    //Verify if user is active
    if (!user.status) {
      return res.status(400).json({
        msg: "The username/password are not correct - status",// - status :: only for tests
      });
    }
 
    //Verify the password 
    const validPassword =  bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: "The username/password are not correct - password",// - password :: only for tests
      });
    } 
    //Generate JWT token
    const token= await generateJWT(user.id);

    res.status(200).json({
      msg: "Authenticated",
      user,
      token
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  login,
};
