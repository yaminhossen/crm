const express = require("express");
const user_routes = require("../app/api/user/router/routes");

const router = express.Router();



router.use(user_routes());


module.exports = () => router;