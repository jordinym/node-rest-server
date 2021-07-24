const { Product } = require("../models");

const getProducts = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;

  try {
    const queryFilter = { status: true };
    const [total, products] = await Promise.all([
      Product.countDocuments(queryFilter),
      Product.find(queryFilter)
        .skip(Number(from))
        .limit(Number(limit))
        .populate("category", "name")
        .populate("user", "name email"),
    ]);

    res.status(200).json({
      msg: "success",
      data: {
        total,
        products,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("category", "name")
      .populate("user", "name email");

    res.status(200).json({
      msg: "success",
      product,
    });
  } catch (error) {
    console.error(error);
  }
};

const createProduct = async (req, res) => {
  const {categoryId,price=0} = req.body;
  const name = req.body.name.toUpperCase();

  try {
    const productDb = await Product.findOne({ name });

    if (productDb) {
      return res.status(400).json({
        msg: `The ${productDb.name} product already exists`,
      });
    }

    const data = {
      name,
      price,
      category: categoryId,
      user: req.user.id,
    };

    const product = new Product(data);

    await product.save();

    res.status(200).json({
      msg: "success",
      product,
    });

  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const name= req.body.name.toUpperCase(); 
    const {categoryId,price=0} = req.body;
    try {

      const queryFilter={ $and: [ {_id: { $ne: id}}, {name: { $eq: name}}]};

      //En caso el id sea diferentre al que se le envia y el nombre sea igual al campo name  
        const productDb = await Product.findOne(queryFilter);  

        if(productDb){
            return res.status(400).json({
                msg: `The ${productDb.name} category already exists`,
              });
        }

        const data={ 
          name,
          price,
          category: categoryId,
          user: req.user.id,
        }

        const product = await Product.findOneAndUpdate(id,data,{returnOriginal:false});
       
        res.status(200).json({
            msg: "success",
            data: product 
          });

    } catch (error) {
        console.error(error);
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOneAndUpdate(id,{status:false},{returnOriginal:false});
        
        res.status(200).json({
            msg: "success",
            data: product 
          });

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
