const express = require("express");
const isAuthMiddleware = require("../../app/middlewares/isAuth.middleware");
const frontendCommonDataMiddleware = require("../../app/middlewares/frontendCommonData.middleware");
const { share_check_auth } = require("../..");
const website_controller = require("../../app/controllers/frontend/wbsite.controller");
const router = express.Router();
let server = null;



module.exports = (mainserver) => {
	website_controller.server = mainserver;
	router
		.get("/", function (req, res) {
			return res.render("frontend/home");
		})
		.get("/login", function (req, res) {
			return res.render("auth/login");
		})
		.get("/signup", function (req, res) {
			return res.render("auth/register");
		})
		.get("/home", function (req, res) {
			return res.render("frontend/home");
		})
	// 	.get("/about", website_controller.about)
	
	return router
};