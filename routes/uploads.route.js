const {Router}=require('express');
const { check } = require('express-validator');
const { saveFile, updateImage, showImage } = require('../controllers/uploads.controller');
const { validCollections } = require('../helpers/db-validators');
const { validateFields, validateFile } = require('../middlewares');
const router = Router();

//FileUpload
router.post('/',[
    validateFile
],saveFile);

//FileUpload -> Users/Producs
router.put('/:collection/:id',[
    check('id', 'The Id is not valid (Mongo)').isMongoId(),
    check('collection').custom(c =>  validCollections(c,['users','products'])),
    validateFile,
    validateFields
],updateImage);

router.get('/:collection/:id',[
    check('id', 'The Id is not valid (Mongo)').isMongoId(),
    check('collection').custom(c =>  validCollections(c,['users','products'])),
    validateFields
],showImage);

module.exports = router;