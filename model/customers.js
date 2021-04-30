const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const customerSchema = new schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: { required: true },
    required: [true, "Please enter your email!"],
    validate: [isEmail, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password!"],
    minlength: [6, "Minimun password length is 6 characters"],
  },
  //   role: 'basic'
});

customerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

customerSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email credential");
  } else {
    const authenticated = await bcrypt.compare(password, user.password);
    if (!authenticated) {
      throw new Error("Incorrect Password credential");
    } else {
      return user;
    }
  }
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
