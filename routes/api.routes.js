const express = require("express");
const user_routes = require("../app/api/user/router/routes");
const product_routes = require("../app/api/product/router/routes");

const router = express.Router();



router.use(user_routes());
router.use(product_routes());


module.exports = () => router;