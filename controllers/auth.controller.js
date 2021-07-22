const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify");
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
        msg: "The username/password are not correct - status", // - status :: only for tests
      });
    }

    //Verify the password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "The username/password are not correct - password", // - password :: only for tests
      });
    }
    //Generate JWT token
    const token = await generateJWT(user.id);

    res.status(200).json({
      msg: "Authenticated",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Please contact the administrator",
    });
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { name, email, image } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: "=)",
        image,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    //Verify if user is active -> In DB
    if (!user.status) {
      return res.status(401).json({
        msg: "Please contact the administrator, User blocked" 
      });
    }

    //Generate JWT token
    const token = await generateJWT(user.id);

    res.status(200).json({
      msg: "Authenticated",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "The Google Token is invalid"
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
