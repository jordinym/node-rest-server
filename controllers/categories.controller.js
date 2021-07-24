const { Category } = require("../models");

const getCategories = async (req, res) => {
    const {limit=5,from=0}=req.query;

    try {
        const queryFilter = { status: true };
        const [total, categories] = await Promise.all([
            Category.countDocuments(queryFilter),
            Category.find(queryFilter).skip(Number(from)).limit(Number(limit)).populate('user'),
          ]);
      
          res.status(200).json({
            msg: "success",
            data: {
              total,
              categories,
            },
          });

    } catch (error) {
        console.error(error);
    } 
};

const getCategoryById = async(req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id)
                                    .populate('user');

    res.status(200).json({
      msg: "Success",
      category,
    });
  } catch (error) {
    console.error(error);
  }
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoryDb = await Category.findOne({ name });

    if (categoryDb) {
      return res.status(400).json({
        msg: `The ${categoryDb.name} category already exists`,
      });
    }

    const data = {
      name,
      user: req.user.id,
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json({
      msg: `Success`,
      category,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateCategory = async (req, res) => {

    const { id } = req.params;
    const name= req.body.name.toUpperCase(); 

    try {
      //En caso el id sea diferentre al que se le envia y el nombre sea igual al campo name
        const categoryDb = await Category.findOne(
          { $and: [ {_id: { $ne: id}},
                    {name: { $eq: name}}
                  ]
          });  

        if(categoryDb){
            return res.status(400).json({
                msg: `The ${categoryDb.name} category already exists`,
              });
        }

        const data={ 
          name,
          user: req.user.id
        }

        const category = await Category.findOneAndUpdate(id,data,{returnOriginal:false}).populate('user');
       
        res.status(200).json({
            msg: "success",
            data: category 
          });

    } catch (error) {
        console.error(error);
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findOneAndUpdate(id,{status:false},{returnOriginal:false}).populate('user');
        
        res.status(200).json({
            msg: "success",
            data: category 
          });

    } catch (error) {
        console.error(error);
    }

};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
