const mongoose = require("mongoose");

const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const validateMobileNumber = (number) => {
  return number.length === 10;
};

const customerDetails = mongoose.Schema({
  customer_id: mongoose.Schema.Types.ObjectId,
  customer_name: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "EmailId is required"],
    validate: [validateEmail, "Please enter a valid email address"],
  },
  mobile_number: {
    type: String,
    unique: true,
    validate: [validateMobileNumber, "Invalid Mobile Number"],
    required: [true, "Mobile number is required"],
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("customerDetails", customerDetails);
