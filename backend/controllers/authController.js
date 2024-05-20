const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Array to store refreshToken
let refreshTokens = [];

const authController = {
  // Generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin, // check if admin
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "10d" }
    );
  },
  // Generate refresh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin, // check if admin
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  // Login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong password!");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        // Add refresh token to array
        refreshTokens.push(refreshToken);
        // Save refresh token to cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Refresh Token
  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      // Remove old refresh token from the array
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // Create new access Token and refresh Token
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      // Add refresh token to array
      refreshTokens.push(newRefreshToken);
      // Save refresh token to cookie
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },
  // Logout
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logged out!");
  },
};

module.exports = authController;
