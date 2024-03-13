const express = require("express");
const isAuthMiddleware = require("../../app/middlewares/isAuth.middleware");
const { server_locals } = require("../..");

const router = express.Router();
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Database
const db = require('../../app/api/db')

// model
const userModel = db.users


router
// login method
	.post("/api/login-submit", async function (req, res) {
		console.log("token form frontend",req.headers.authorization.split(' ')[1]);
		const { email, password } = req.body;
		// console.log('pre pass', password);
		let token_salt = crypto.randomBytes(64).toString("hex").substring(0, 20);
		let user = await userModel.findOne({ where: { email: email } });
		// console.log('last pass', user);
		// console.log('found user',user);
		// return ;
		if (user) {
			let passMatch = await bcrypt.compare(password, user?.password);
			// return;
			if (passMatch) {
				user.token_salt = token_salt;
				user.save();
				let data = {
					username: user?.dataValues?.user_name,
					role: user?.dataValues?.role,
					id: user?.dataValues?.id,
					email: user?.dataValues?.email,
					token_salt,
				};
				req.session.isAuth = true;
				req.session.user = data;
				// console.log('data', res?.cookie);
				var token = await jwt.sign(data, 'yamin1234');
				// res.cookie('token', token)
				console.log('data', req?.session);
				let prevUrl = req.session.prev_auth_url;
				// console.log('prevurl',prevUrl);
				console.log('tokenee',token);
				// console.log('session',req.session.user);
				// return;
				if (prevUrl) {
					delete req.session.prev_auth_url;
					if (prevUrl != "/favicon.ico") {
						return res.redirect(prevUrl);
					}
				}
				return res.status(201).json({ code: 'password match', message: 'your password match', token: token, data});
			}
			return res.status(401).json({ code: 'password does not match', message: 'your crediential does not match' });
		}
		
		// return res.redirect("/login");
		return res.status(401).json({ code: 'user not found', message: 'your crediential does not match' });;
	})

	// signup method
	/* .post("/signup-submit", async function (req, res) {
		// console.log(req.body);
		const { username, email, password, password_confirmation } = req.body;
		let error = {};
		req.session.old = req.body;
		if (!username || !email || !password || !password_confirmation) {
			if (!username) {
				error.username = "username is required";
			}
			if (!email) {
				error.email = "email is required";
			}
			if (!password) {
				error.password = "password is required";
			}
			if (!password_confirmation) {
				error.password_confirmation = "password_confirmation is required";
			}
			req.session.error = error;
			return res.redirect("/signup");
		}
		if (password != password_confirmation) {
			error.password = "password does not matched";
			req.session.error = error;
			return res.redirect("/signup");
		}

		let user = await new userModel({
			username,
			email,
			password: await bcrypt.hash(password, 13),
		}).save();

		// console.log(user);

		req.session.isAuth = true;
		req.session.user = user;
		let prevUrl = req.session.prev_auth_url;
		if (prevUrl) {
			delete req.session.prev_auth_url;
			return res.redirect(prevUrl);
		}
		res.redirect("/dashboard");
	}) */


	// isauth method
	// .use(isAuthMiddleware())

	// logout method
	// .post("/api/logout", function (req, res) {
	// 	console.log('req user',req);
	// 	// req.session.isAuth = false;
	// });

module.exports = () => router;
