const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categories.controller");
const { categoryIdExists } = require("../helpers/db-validators");
const { validateJWT, validateFields } = require("../middlewares");

const router = Router();

// se añade middleware para validar token y errores en request
router.use(validateJWT); 

router.get("/", getCategories);

router.get("/:id", 
[
    check('id', 'The Id is not valid').isMongoId(), 
    check("id").custom(categoryIdExists),
    validateFields
], getCategoryById);

router.post("/",
  [ 
    check("name", "The name is required").notEmpty(),
    validateFields
  ],createCategory
);

router.put("/:id", 
[
    check('id', 'The Id is not valid').isMongoId(), 
    check("id").custom(categoryIdExists),
    check("name", "The name is required").notEmpty(),
    validateFields
], updateCategory);

router.delete("/:id",
[
  check('id', 'The Id is not valid').isMongoId(), 
  check("id").custom(categoryIdExists),
  validateFields
], deleteCategory);

module.exports = router;
