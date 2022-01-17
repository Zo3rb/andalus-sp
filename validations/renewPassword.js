const Validator = require('validator');
const validText = require("./valid-text");

module.exports = data => {
    let errors = {};

    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";

    // --------- Constrains --------
    if (Validator.isEmpty(data.password)) errors.password = "Password is Required Field";
    if (Validator.isEmpty(data.password2)) errors.password2 = "Password Confirmation is Required Field";

    if (!Validator.isLength(data.password, { min: 6 })) errors.password = "Password Must be More Than 6's";

    if (data.password !== data.password2) errors.password2 = "Both Password Don't Match";

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
