const ordersDetails = require("../models/ordersDetails");
const mongoose = require("mongoose");
const customerDetails = require("../models/customerDetails");
const router = require("express").Router();

router.get("/ordersDetails/", async (request, response) => {
  try {
    const { city } = request.query;
    const filteredOrdersDetails = await ordersDetails.find(
      { city: city },
      {
        _id: 0,
        customerId: "$customer_id",
        purchaseOrderId: "$purchase_order_id",
        productName: "$product_name",
        quantity: "$quantity",
        price: "$price",
        mrp: "$mrp",
        address: "$address",
        pincode: "$pincode",
        city: "$city",
      }
    );

    if (filteredOrdersDetails) {
      response.status(200).send(filteredOrdersDetails);
    }
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.get("/customersOrdersPurchaseDetails", async (request, response) => {
  try {
    const groupedOrdersDetails = await ordersDetails
      .aggregate([
        {
          $group: {
            _id: "$customer_id",
            purchaseOrder: {
              $push: {
                productName: "$product_name",
                purchaseOrderId: "$purchase_order_id",
                quantity: "$quantity",
                price: "$price",
                mrp: "$mrp",
              },
            },
          },
        },
      ])
      .project({
        _id: false,
        customer_id: "$_id",
        purchaseOrder: "$purchaseOrder",
      });

    if (groupedOrdersDetails) {
      response.status(200).send(groupedOrdersDetails);
    }
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

router.get("/customersOrdersShipmentsDetails", async (request, response) => {
  try {
    const groupedOrdersDetails = await ordersDetails
      .aggregate([
        {
          $group: {
            _id: "$customer_id",
            purchaseOrder: {
              $push: {
                productName: "$product_name",
                purchaseOrderId: "$purchase_order_id",
                quantity: "$quantity",
                price: "$price",
                mrp: "$mrp",
                shipmentDetail: [
                  { address: "$address", pincode: "$pincode", city: "$city" },
                ],
              },
            },
          },
        },
      ])
      .project({
        _id: false,
        customer_id: "$_id",
        purchaseOrder: "$purchaseOrder",
      });

    if (groupedOrdersDetails) {
      response.status(200).send(groupedOrdersDetails);
    }
  } catch (err) {
    response.status(400).send({ message: err.message });
  }
});

module.exports = router;
