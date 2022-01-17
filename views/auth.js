const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/reg", AuthController.registerNewUser);
router.post("/account-activation", AuthController.accountActivation);
router.post("/login", AuthController.loginUser);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/renew-password", AuthController.renewPassword);
router.post("/google-login", AuthController.googleLogin);
router.post("/facebook-login", AuthController.facebookLogin);

module.exports = router;
