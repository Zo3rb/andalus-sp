const Validator = require("validator");
const validText = require("./valid-text");

module.exports = data => {
    let errors = {};

    data.email = validText(data.email) ? data.email : "";
    // --------- Constrains --------
    if (Validator.isEmpty(data.email)) errors.email = "Email is Required Field";
    if (!Validator.isEmail(data.email)) errors.email = "Email Field Must be a Valid Email";

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
