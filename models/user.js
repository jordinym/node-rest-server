const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  image: {
    type: String,
  },
  image_id: { type: String},
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//Only for responses in JSON (Response)
userSchema.methods.toJSON = function () {
  const { __v, password,_id, ...user } = this.toObject();
  user.uid=_id;
  return user;
};

module.exports = model("User", userSchema); //create model
