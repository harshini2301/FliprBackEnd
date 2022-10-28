const ordersDetails = require("../models/ordersDetails");
const mongoose = require("mongoose");
const customerDetails = require("../models/customerDetails");
const router = require("express").Router();

router.post("/addCustomer", async (request, response) => {
  const { customerName, emailId, mobileNumber, city } = request.body;

  try {
    const newCustomerDetails = await customerDetails.create({
      customer_id: mongoose.Types.ObjectId(),
      customer_name: customerName,
      email_id: emailId,
      mobile_number: mobileNumber,
      city,
    });

    if (newCustomerDetails) {
      response.status(200).send({
        message: "Customer Added Successfully",
        customerId: newCustomerDetails.customer_id,
      });
    }
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.post("/purchaseOrder", async (request, response) => {
  const { productName, quantity, price, mrp, customerId } = request.body;

  try {
    const newOrderDetails = await ordersDetails.create({
      product_name: productName,
      quantity,
      mrp,
      price,
      customer_id: customerId,
      purchase_order_id: mongoose.Types.ObjectId(),
    });

    if (newOrderDetails) {
      response.status(200).send({
        message: "Order Placed Successfully",
        purchaseOrderId: newOrderDetails.purchase_order_id,
      });
    }
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.put("/addShippingDetails", async (request, response) => {
  const { address, city, pincode, purchaseOrderId, customerId } = request.body;

  try {
    const updateShippingDetails = await ordersDetails.updateOne(
      {
        $and: [
          { purchase_order_id: purchaseOrderId },
          { customer_id: customerId },
        ],
      },
      { $set: { address, city, pincode } }
    );

    if (updateShippingDetails) {
      response
        .status(200)
        .send({ message: "Shipping Details Added Successfully" });
    }
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

module.exports = router;
