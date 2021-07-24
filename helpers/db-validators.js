const { Role, User, Category } = require("../models");

const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The ${role} is not registered in database`);
  }
};

const isExistsEmail = async (email = "") => {
  //Validate unique email
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`The Email ${email}  already exists in database`);
  }
};

const isExistsUserById = async (id = "") => {
  //Validate unique email
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`The Id ${id} not exists in database`);
  }
};

const isExistsId = async (id = "") => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`The Id ${id} not exists in database`);
  }
};

module.exports = {
  isValidRole,
  isExistsEmail,
  isExistsUserById,
  isExistsId
};
