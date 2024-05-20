const authController = require("../controllers/authController");
const middlewareController = require("../middleware/middlewareController");

const router = require("express").Router();
// Login
router.post("/login", authController.loginUser);
// Refresh
router.post("/refresh", authController.requestRefreshToken);
// Logout
router.post("/logout", middlewareController.verifyToken, authController.userLogout);

module.exports = router;