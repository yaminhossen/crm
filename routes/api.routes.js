const express = require("express");
const user_routes = require("../app/api/user/router/routes");
const product_routes = require("../app/api/product/router/routes");
const customer_support_tickets  = require("../app/api/customers/customer_support_tickets/router/routes");
const customers  = require("../app/api/customers/customer/router/routes");
const calender_events  = require("../app/api/customers/calender_events/router/routes");
const customer_contact_numbers  = require("../app/api/customers/customer_contact_numbers/router/routes");
const customer_group_customers  = require("../app/api/customers/customer_group_customers/router/routes");
const  customer_relevent_documents  = require("../app/api/customers/customer_relevent_documents/router/routes");
const  customer_variant_customer  = require("../app/api/customers/customer_variant_customers/router/routes");
const  customer_variant_values  = require("../app/api/customers/customer_variant_values/router/routes");

const router = express.Router();



router.use(user_routes());
router.use(product_routes());
router.use(customer_support_tickets());
router.use(customers());
router.use(calender_events());
router.use(customer_contact_numbers());
router.use(customer_group_customers());
router.use(customer_relevent_documents());
router.use(customer_variant_customer());
router.use(customer_variant_values());



module.exports = () => router;