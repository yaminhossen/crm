const express = require("express");
const user_routes = require("../app/api/user/router/routes");
const product_routes = require("../app/api/product/router/routes");
const customer_support_tickets  = require("../app/api/customers/customer_support_tickets/router/routes");
const customers  = require("../app/api/customers/customer/router/routes");
const calender_events  = require("../app/api/customers/calender_events/router/routes");
const customer_contact_numbers  = require("../app/api/customers/customer_contact_numbers/router/routes");

const router = express.Router();



router.use(user_routes());
router.use(product_routes());
router.use(customer_support_tickets());
router.use(customers());
router.use(calender_events());
router.use(customer_contact_numbers());



module.exports = () => router;