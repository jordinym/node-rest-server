const bcrypt = require("bcryptjs");

const User = require("../models/user");

const userGet = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;

  try {
    const queryFilter = { status: true };

    /**
     * PRIMERA FORMA COMENTADA CON MUCHA DESVENTAJA PORQUE TIENE QUE ESPERAR QUE TERMINE
     * LA PRIMERA CONSULTA PARA QUE SE EJECUTE LA SIGUIENTE
     * **/

    // const users= await User.find(queryFilter)
    // .skip(Number(from))
    // .limit(Number(limit));

    //const total = await User.countDocuments(queryFilter); //method count was replaced by countDocuments

    /**
     * SEGUNDA FORMA SE APROVECHA BASTANTE LOS TIEMPOS PORQUE AMBAS CONSULTAS SE EJECUTAN AL MISMO TIEMPO
     * **/
    const [total, users] = await Promise.all([
      User.countDocuments(queryFilter),
      User.find(queryFilter).skip(Number(from)).limit(Number(limit)),
    ]);

    res.status(200).json({
      msg: "success",
      data: {
        total,
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userDb = new User({ name, email, password, role });

  try {
    // Encrypt password
    const sal = bcrypt.genSaltSync();
    userDb.password = bcrypt.hashSync(password, sal);

    await userDb.save();

    res.status(200).json({
      msg: "success",
      data: userDb,
    });
  } catch (error) {
    console.log(error);
  }
};

const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...otherParams } = req.body;

  try {
    //validar contra BD
    if (password) {
      // Encrypt password
      const sal = bcrypt.genSaltSync();
      otherParams.password = bcrypt.hashSync(password, sal);
    }
    const userDb = await User.findByIdAndUpdate(id, otherParams);
    res.status(200).json({
      msg: "success",
      data: userDb,
    });
  } catch (error) {
    console.log(error);
  }
};

const userDelete = async (req, res) => {
  const { id } = req.params;  
  try {

    //remove user physically
    //const userDb = await User.findByIdAndDelete(id);

    //remove user logically
    const userDb= await User.findByIdAndUpdate(id,{status:false});

    res.status(200).json({
      msg: "success",
      data: userDb,
    });

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
