const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const validateRegisterInputs = require("../validations/register");
const validateLoginInputs = require("../validations/login");
const validateFPasswordInput = require('../validations/fPassword');
const validatePasswords = require("../validations/renewPassword");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.registerNewUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const { errors, isValid } = validateRegisterInputs({
		name,
		email,
		password,
	});

	// Input Validation 1st --> Pass or Throw Errors.
	if (!isValid) {
		return res.status(400).json({
			message: "Failed to Register a New User",
			errors,
		});
	}

	// If The Input Has Email That is Registered Before --> if True Throw Errors.
	const existUser = await User.findOne({ email });
	if (existUser) {
		return res.status(400).json({
			message: "Failed to Register a New User",
			data: "This Email is Already Registered",
		});
	}

	// Generate JWT TokeN.
	const token = jwt.sign(
		{ name, email, password },
		process.env.APPLICATION_ACTIVATION,
		{ expiresIn: "10m" }
	);

	// Generate The Email Template & Sending it to The Registered Email.
	const msg = {
		to: email,
		from: process.env.EMAIL_FROM,
		subject: "Andalus Registration Activation Link",
		text: "This is The Sample Text of The Email",
		html: `
			<h1>Please Use The Below Link to Activate Your Account</h1>
			<a href="${process.env.CLIENT_URL}/auth/activate/${token}" target="_blank">HERE</a>
			<p>This Email Should be Expired in 10 Minutes Since Received</p>
			<p>Can Always Register from <a href="${process.env.CLIENT_URL}/reg" target="_blank">HERE</a></p>
		`,
	};

	await sgMail.send(msg);

	res.json(
		`Sent Email Confirmation to ${email}. please follow the instructions to complete Registration process`
	);
});

exports.accountActivation = asyncHandler(async (req, res) => {
	// Get The Token From The Request Body
	const { token } = req.body;

	// Decode The Token
	const { email, name, password } = await jwt.verify(
		token,
		process.env.APPLICATION_ACTIVATION
	);

	// No Token or Expired
	if (!token) {
		return res.json("Link is Corrupted, Please Try to Register Again");
	}

	const newUser = await User.create({ email, name, password });

	res.json({
		message: "Successfully Registered The User",
		data: newUser,
	});
});

exports.loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const { errors, isValid } = validateLoginInputs({
		email,
		password,
	});

	// Input Validation 1st --> Pass or Throw Errors.
	if (!isValid) {
		return res.status(400).json({
			message: "Failed to Login The User",
			errors,
		});
	}

	// Get The User from The Database & Assign em a Token
	const user = await User.findByCredentials(email, password);
	const token = jwt.sign(
		{ id: user._id, email: user.email },
		process.env.APPLICATION_SECRET,
		{ expiresIn: "7d" }
	);

	res.json({
		message: "Successfully Logged in a User",
		token,
		data: user,
	});
});

exports.forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const { errors, isValid } = validateFPasswordInput({ email });

	// Input Validation 1st --> Pass or Throw Errors.
	if (!isValid) {
		return res.status(400).json({
			message: "Please Add a Valid Email",
			errors,
		});
	};

	// Getting The Email's User Data
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).json({ message: "This Email is Not Registered on Our Web App" });
	};

	// Generate JWT TokeN.
	const token = jwt.sign({ id: user._id, email: user.email }, process.env.APPLICATION_SECRET, { expiresIn: "10m" });

	// Generate The Email Template & Sending it to The Registered Email.
	const msg = {
		to: email,
		from: process.env.EMAIL_FROM,
		subject: "Andalus Forgot Password Email",
		text: "This is The Sample Text of The Email",
		html: `
			<h1>Please Use The Below Link to Reset Your Password</h1>
			<a href="${process.env.CLIENT_URL}/auth/change-password/${token}" target="_blank">HERE</a>
			<p>This Email Should be Expired in 10 Minutes Since Received</p>
		`,
	};

	await sgMail.send(msg);

	res.json(
		`Sent Email to ${email}. please follow the instructions to complete Forgot Password Process`
	);
});

exports.renewPassword = asyncHandler(async (req, res) => {
	const { password, password2, token } = req.body;

	const { errors, isValid } = validatePasswords({ password, password2 });

	// Input Validation 1st --> Pass or Throw Errors.
	if (!isValid) {
		return res.status(400).json({
			message: "Failed to Re New Password",
			errors,
		});
	}

	const { id, email } = await jwt.verify(token, process.env.APPLICATION_SECRET);

	if (!token) {
		return res.json({ message: "Link is Corrupted, Please Try to Register Again" });
	};

	const user = await User.findOne({ _id: id, email });

	user.password = password;

	await user.save();

	res.status(201).json("Password Has Been Changed Successfully, You Can Login Now With The New Password");
});

exports.googleLogin = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	// Check if The User's Email is Already Registered in DB
	let registeredUser = await User.findOne({ email });
	if (registeredUser) {
		registeredUser = await User.findByCredentials(email, password);
		const token = jwt.sign(
			{ id: registeredUser._id, email: registeredUser.email },
			process.env.APPLICATION_SECRET,
			{ expiresIn: "7d" }
		);

		return res.json({
			message: "Successfully Logged in a User",
			token,
			data: registeredUser,
		});
	} else {
		// If not Registered --> (Create new Entry and Generate it a Token)
		const newUser = await User.create({ email, password, name });
		const token = jwt.sign(
			{ id: newUser._id, email: newUser.email },
			process.env.APPLICATION_SECRET,
			{ expiresIn: "7d" }
		);

		return res.json({
			message: "Successfully Logged in a User",
			token,
			data: newUser,
		});
	}
});

exports.facebookLogin = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	// Check if The User's Email is Already Registered in DB
	let registeredUser = await User.findOne({ email });
	if (registeredUser) {
		registeredUser = await User.findByCredentials(email, password);
		const token = jwt.sign(
			{ id: registeredUser._id, email: registeredUser.email },
			process.env.APPLICATION_SECRET,
			{ expiresIn: "7d" }
		);

		return res.json({
			message: "Successfully Logged in a User",
			token,
			data: registeredUser,
		});
	} else {
		// If not Registered --> (Create new Entry and Generate it a Token)
		const newUser = await User.create({ email, password, name });
		const token = jwt.sign(
			{ id: newUser._id, email: newUser.email },
			process.env.APPLICATION_SECRET,
			{ expiresIn: "7d" }
		);

		return res.json({
			message: "Successfully Logged in a User",
			token,
			data: newUser,
		});
	}
});
