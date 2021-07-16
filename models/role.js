const {Schema,model }= require('mongoose');

const roleSchema = new Schema({

    role:{
        type: String,
        required: [true, 'The roles is required']
    }
});

module.exports = model('Role', roleSchema);