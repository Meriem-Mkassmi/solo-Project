const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "It must be more than two characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "It must be more than two characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._-]+@dojo\.tn$/,
      "Please provide a valid email address in the format 'name@dojo.tn'",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "It must be more than six characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
    minlength: [6, "It must be more than six characters"],

  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
