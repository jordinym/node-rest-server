const { Router} = require('express');
const { check } = require('express-validator');
const { 
  getProductById, 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct } = require('../controllers/products.controller');
const { productIdExists, categoryIdExists } = require('../helpers/db-validators');
const { validateJWT, validateFields } = require('../middlewares');
const router = Router();


// se añade middleware para validar token y errores en request
router.use(validateJWT); 

router.get("/", getProducts);

router.get("/:id", 
[
  check('id', 'The Id is not valid (Mongo)')
  .isMongoId()
  .bail()
  .custom(productIdExists),
    validateFields
], getProductById);

router.post("/",
  [ 
    check("name", "The name is required").notEmpty(),
    check('categoryId', 'The categoryId is not valid (Mongo)')
    .isMongoId()
    .bail()  // si lo anterior no es válido no se ejecutara lo siguiente
    .custom(categoryIdExists), 
    validateFields
  ],createProduct
);

router.put("/:id", 
[
    check('id', 'The Id is not valid (Mongo)')
          .isMongoId()
          .bail()
          .custom(productIdExists),
    check("name", "The name is required").notEmpty(),
    check('categoryId', 'The categoryId is not valid (Mongo)')
        .isMongoId()
        .bail()  // si lo anterior no es válido no se ejecutara lo siguiente
        .custom(categoryIdExists), 
 
    validateFields
], updateProduct);

router.delete("/:id",
[
  check('id', 'The Id is not valid(Mongo)')
          .isMongoId()
          .bail()
          .custom(productIdExists),
  validateFields
], deleteProduct);

module.exports = router;