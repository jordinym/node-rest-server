const path=require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers/upload-file-validator");
const { User, Product } = require("../models");

//FileUpload
const saveFile = async (req, res) => {
  /* se construyo un middleware => validate-file.js
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }*/

  try {
    //const fileName = await uploadFile(req.files, ["txt", "md"], "textos");
    const fileName = await uploadFile(req.files,undefined, "images");
    res.json({
      fileName,
    });
  } catch (msg) {
    console.error(msg);
    res.status(400).json({ msg });
  }
};

//FileUpload -> Users/Producs
const updateImage = async (req, res) => {
  //console.log(req);
  const { id, collection } = req.params;

  /* se construyo un middleware => validate-file.js
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }*/

  let model;

  try {
    
 
  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Not exists user with id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Not exists product with id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: `I forgot to validate this`,
      });
  }

  // Limpiar images previas 
    if(model.image){
      // hay que borrar la imagen del servidor
      //../uploads => sale carpeta raiz donde esta uploads
      const pathImage =  path.join(__dirname,'../uploads',collection,model.image);
      if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage);
      }
    }

  const fileName = await uploadFile(req.files, undefined, collection);

  model.image = fileName;

  await model.save();

  res.json({
    msg: "Success",
    model,
  });

} catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: error,
    });
}
};

const updateImageCloudinary = async (req, res) => { 
  const { id, collection } = req.params; 
  let model;

  try {
    
 
  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Not exists user with id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Not exists product with id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: `I forgot to validate this`,
      });
  }

  // Limpiar images previas 
    if(model.image_id){
      // hay que borrar la imagen del servidor
      /* para evitar obtener el id publico de la imagen de la siguiente url
      https://res.cloudinary.com/dqhmsqhiv/image/upload/v1628159473/nd9se8f6dzvmzarcqdil.jpg
      SE ESTA ALMACENANDO EN LA BD

      const nameArr=model.image.split('/'); 
      const name=nameArr[nameArr.length-1];
      const [public_id,extension]=name.split('.'); 
      */
   
      cloudinary.uploader.destroy(model.image_id);
    }

    const {tempFilePath} = req.files.archivo;
    //const response= await  cloudinary.uploader.upload(tempFilePath)
   const {secure_url,public_id}= await  cloudinary.uploader.upload(tempFilePath)
    
    model.image_id = public_id; 
    model.image = secure_url; 
    await model.save();

  res.json({
    msg: "Success",
    model,
  });

} catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: error,
    });
}
};


const showImage = async (req, res) => {
  const { id, collection } = req.params; 

  let model;

  try {
    
 
  switch (collection) {
    case "users":
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Not exists user with id ${id}`,
        });
      }
      break;
    case "products":
      model = await Product.findById(id);

      if (!model) {
        return res.status(400).json({
          msg: `Not exists product with id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: `I forgot to validate this`,
      });
  }

  // Limpiar images previas 
    if(model.image){
      // hay que borrar la imagen del servidor
      //../uploads => sale carpeta raiz donde esta uploads
      const pathImage =  path.join(__dirname,'../uploads',collection,model.image);
      if(fs.existsSync(pathImage)){
       return res.status(200).sendFile(pathImage);
      }
    }
  
    const pathImageNotFound=path.join(__dirname,'../public/assets','no-image.jpg');
    res.status(200).sendFile(pathImageNotFound);

} catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: error,
    });
}

}

module.exports = {
  saveFile,
  updateImage,
  showImage,
  updateImageCloudinary
};
