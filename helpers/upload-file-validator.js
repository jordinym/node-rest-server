const path = require("path");
const { v4: uuidv4 } = require('uuid');

const uploadFile=(files,validExtensions=['png','jpg','jpeg','gif'],folder='')=>{
  
    return new Promise((resolve, reject)=>{
        const { archivo } = files;
        const nameCutOff=archivo.name.split('.');
        const fileExtension=nameCutOff[nameCutOff.length - 1];
      
        //Validate the extension
        if(!validExtensions.includes(fileExtension)){
         return reject(`The extension ${fileExtension} is not supported, ${validExtensions}`);
        }
      
        const tempName= `${uuidv4()}.${fileExtension}`;
      
        const uploadPath = path.join(__dirname, "../uploads/",folder, tempName);
      
        //Usa el método mv () para colocar el archivo en algún lugar de tu servidor
        archivo.mv(uploadPath, function (err) {
          if (err) {
            return reject(err);
          }
      
          resolve(tempName);
        });
    })
  
}

module.exports = {
    uploadFile
}