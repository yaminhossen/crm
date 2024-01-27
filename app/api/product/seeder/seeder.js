const { default: mongoose, Schema } = require("mongoose");
// const { db_url } = require("../../../configs/db.config");
const { db_url } = require("../../../../configs/db.config");
// const userModel = require("../user.model");
const Model = require("../model/model");

let data = [
	{
		username: "RajiburRahman",
		email: "admin@gmail.com",
		password: "$2b$13$PlbkNt7Cl5.lwzOjdsBR4e.xgaRZEdsUXCs377PZ5McUPQTBMv/iy",
		full_name: "Mohammad Rajibur Rahman",
		telegram_id: "rajib@rahman",
		telegram_name: "Rajibur Rahman",
		mobile_number: "01777777777",
		role: 13,
		photo: "",
		status: true,
		remember_token: "rememberToken"
	},
	{
		username: "AlifSagir",
		email: "alif@gmail.com",
		password: "$2b$13$PlbkNt7Cl5.lwzOjdsBR4e.xgaRZEdsUXCs377PZ5McUPQTBMv/iy",
		full_name: "Mohammad alif",
		telegram_id: "alif@alif",
		telegram_name: "Alif sagir",
		mobile_number: "01944553344",
		role: 31,
		photo: "",
		status: true,
		remember_token: "rememberToken"
	},
	{
		username: "ArifBillah",
		email: "Arif@gmail.com",
		password: "$2b$13$PlbkNt7Cl5.lwzOjdsBR4e.xgaRZEdsUXCs377PZ5McUPQTBMv/iy",
		full_name: "Mohammad Arif",
		telegram_id: "Arif@Arif",
		telegram_name: "Arif Billah",
		mobile_number: "01944553343",
		role: 31,
		photo: "",
		status: true,
		remember_token: "rememberToken"
	},
	
];

module.exports = () => mongoose.connect(db_url).then(async () => {
	console.log("\n");
	console.log("user seeding");
	// console.log('$2b$13$PlbkNt7Cl5.lwzOjdsBR4e.xgaRZEdsUXCs377PZ5McUPQTBMv/iy');

	await Model.deleteMany({});

	for (let i = 0; i < data.length; i++) {
		await Model.create(data[i]);
	}

	console.log("user seeding complete");

	console.log("\n");
});
