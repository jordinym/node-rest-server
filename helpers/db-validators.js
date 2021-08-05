const { Role, User, Category, Product } = require("../models");

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

const categoryIdExists = async (id = "") => {
  if(id){ 
  const category = await Category.findById(id);
  if (!category) {
    throw new Error(`The Id ${id} not exists in database`);
  }
}
};

const productIdExists = async (id = "") => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`The Id ${id} not exists in database`);
  }
};

/**
 * aqui se pone el return true porque se esta enviando más de un parametro
 * en los anteriores no era necesario porque de forma implicita si no cumplia la condición devolvia true
 *  */ 
const validCollections =(collection='', collections=[])=>{

  if(!collections.includes(collection)){
    throw new Error(`The collection ${collection} is not supported, ${collections}`);
  }

  return true;
}

module.exports = {
  isValidRole,
  isExistsEmail,
  isExistsUserById,
  categoryIdExists,
  productIdExists,
  validCollections
};
