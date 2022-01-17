const Validator = require("validator");
const validText = require("./valid-text");

module.exports = (data) => {
	let errors = {};

	data.email = validText(data.email) ? data.email : "";
	data.password = validText(data.password) ? data.password : "";

	// --------- Constrains --------
	if (Validator.isEmpty(data.email)) errors.email = "Email is Required Field";
	if (Validator.isEmpty(data.password))
		errors.password = "Password is Required Field";

	if (!Validator.isLength(data.password, { min: 6 }))
		errors.password = "Password Field Should be More than 6's";
	if (!Validator.isEmail(data.email))
		errors.email = "Email Field Must be a Valid Email";

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
};
