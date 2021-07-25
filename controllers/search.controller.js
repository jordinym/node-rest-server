const { ObjectId } = require("mongoose").Types;
const { User, Category, Role, Product } = require("../models");

const allowedCollections = ["users", "roles", "categories", "products"];

const searchUsers = async (term = "", res) => {
  const isMongoId = ObjectId.isValid(term);
  let users=[];
  if (isMongoId) {
    const user = await User.findById(term);
    users=user ? [user] : users;

  } else {
    
    const regExp=new RegExp(term,'i');
    const queryFilter = {
        $and:[
            {status:true},
            {$or: [{ name: regExp },{ email: regExp }]}
        ]
        };
    const usersDB = await User.find(queryFilter);
    users=usersDB ? [...usersDB] : users;
  }

  res.json({
    results: users
  });

};
const searchCategories = async (term = "", res) => {
    const isMongoId = ObjectId.isValid(term);
    let categories=[];
    if (isMongoId) {
      const category = await Category.findById(term);
      categories=category ? [category] : categories;
  
    } else {
      
      const regExp=new RegExp(term,'i'); 
      const categoriesDB = await Category.find({name:regExp,status:true});
      categories=categoriesDB ? [...categoriesDB] : categories;
    }
  
    res.json({
      results: categories
    });
  
  };
  const searchProducts = async (term = "", res) => {
    const isMongoId = ObjectId.isValid(term);
    let products=[];
    if (isMongoId) {
      const product = await Product.findById(term).populate('category','name');
      products=product ? [product] : products;
  
    } else {
      
      const regExp=new RegExp(term,'i'); 
      const productsDB = await Product.find({name:regExp,status:true}).populate('category','name');
      products=productsDB ? [...productsDB] : products;
    }
  
    res.json({
      results: products
    });
  
  };
  const searchRoles = async (term = "", res) => {
    const isMongoId = ObjectId.isValid(term);
    let roles=[];
    if (isMongoId) {
      const role = await Role.findById(term);
      roles=role ? [role] : roles;
  
    } else {
      
      const regExp=new RegExp(term,'i'); 
      const rolesDB = await Role.find({role:regExp});
      roles=rolesDB ? [...rolesDB] : roles;
    }
  
    res.json({
      results: roles
    });
  
  };
const search = (req, res) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `The allowed Collections are ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "roles":
        searchRoles(term, res);
      break;
    case "categories":
        searchCategories(term, res);
      break;
    case "products":
        searchProducts(term, res);
      break;
    default:
      res.status(400).json({
        msg: `The allowed Collections are ${allowedCollections}`,
      });
      break;
  }
};

module.exports = {
  search,
};
