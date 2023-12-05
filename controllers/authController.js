const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "Username and password are required" });
  }
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // Create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3m" }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Save refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, roles });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
