const Validator = require("validator");
const validText = require("./valid-text");

module.exports = (data) => {
	let errors = {};

	data.email = validText(data.email) ? data.email : "";
	data.name = validText(data.name) ? data.name : "";
	data.password = validText(data.password) ? data.password : "";

	// --------- Constrains --------
	if (Validator.isEmpty(data.name))
		errors.name = "Username is Required Field";
	if (Validator.isEmpty(data.email)) errors.email = "Email is Required Field";
	if (Validator.isEmpty(data.password))
		errors.password = "Password is Required Field";

	if (!Validator.isLength(data.password, { min: 6 }))
		errors.password = "Password Field Should be More than 6's";
	if (!Validator.isLength(data.name, { min: 4, max: 30 }))
		errors.name = "Username Must be More Than 4's and Less Than 30's";

	if (!Validator.isEmail(data.email))
		errors.email = "Email Field Must be a Valid Email";

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
};
