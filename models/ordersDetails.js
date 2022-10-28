const mongoose = require("mongoose");
const customerDetails = require("./customerDetails");

function priceValidator(price) {
  return this.mrp >= price;
}

const customerIdValidator = async (id) => {
  const customers = await customerDetails.find({ customer_id: id });
  return customers.length === 1;
};

const ordersDetails = mongoose.Schema({
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: [priceValidator, "Pricing can't be greater than MRP"],
  },
  purchase_order_id: mongoose.Schema.Types.ObjectId,
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    validate: [customerIdValidator, "Customer ID Does Not Exist"],
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  pincode: {
    type: Number,
    default: 000000,
  },
});

module.exports = mongoose.model("ordersDetails", ordersDetails);
