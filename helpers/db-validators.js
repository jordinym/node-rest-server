const { check, validationResult } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The ${role} is not registered in database`);
  }
};

const isExistsEmail = async (email='') => {
 //Validate unique email
  const existsEmail = await User.findOne({ email }); 
    if (existsEmail) { 
      throw new Error(`The Email ${email}  already exists in database`);
    }
};

module.exports = {
  isValidRole,
  isExistsEmail
};
