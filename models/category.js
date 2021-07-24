const {Schema,model}= require('mongoose');

const categorySchema = new Schema({ 
    name: { 
        type:String, 
        unique:true,
        required: [true, "The name is required"]
    },
    status: { 
        type:Boolean, 
        default: true,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

});

categorySchema.methods.toJSON = function(){
    const { __v:ctU,_id:categoryId,...category } = this.toObject();
    
    /**
     * Si esque se formatea de esta forma siempre devolvera este objeto
     * Por eso solo a nivel de controlador se especificara los campos en la funcion POPULATE
     */
    /*const { __v:usU, password,_id:userId, ...user } = category.user;
    user.uid=userId;
    category.user=user;*/
    category.uid=categoryId; 
    return category;
};

module.exports=model('Category',categorySchema);