let ObjectId = require('mongodb').ObjectId;

const uesrProfileInfosModel = require("../../api/user/model/model")



const { async } = require("q");
const logger = require('../../utilites/logger');
const controllers = {
	folder_prefix: ``,
	route_prefix: ``,
	server: null,

	
	about: async function (req, res) {
		let profile_info = await uesrProfileInfosModel.find();

		controllers.server.locals.seo_title = 'আমার তথ্যাদি';

		return res.render(`frontend/about`, {
			profile_info,
			user_educations,
			banner,
			abouts,
		});
	},
	
};

module.exports = controllers;
