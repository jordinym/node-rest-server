const mongoose = require("mongoose");

const dbConecction = async () => {

  try {
    await mongoose.connect(process.env.MONGO_DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false
    });

    console.log("MongoDB :: Connect");

  } catch (error) {
    console.error(error);
    throw new Error("Error : Initial database");
  }
  
};

module.exports = {
  dbConecction,
};
