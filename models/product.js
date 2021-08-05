const {Schema,model }= require('mongoose');

const productSchema = new Schema({

    name:{
        type:String,
        unique:true,
        required: [true, "The name is required"]
    },
    status: {
        type:Boolean,
        default: true,
        required:true
    },
    price:{
        type:Number,
        default:0,
    },
    category: {
        type:Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    description: { type: String },
    available: { type: Boolean, defult: true },
    image: { type: String},
});

productSchema.methods.toJSON = function(){
    const {__v,_id, ...product} = this.toObject();

    product.uid=_id;
    return product;
}
module.exports = model('Product',productSchema);