const User = require("../model/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204); // Successful, no content
  }
  const refreshToken = cookies.jwt;

  // Is refreshToken in DB?
  await User.findOneAndUpdate(
    { refreshToken },
    { $unset: { refreshToken: "" } }
  );
  // Remove cookie and send successful status, whether or not matching refreshToken was found
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only served on https
  res.sendStatus(204);
};

module.exports = { handleLogout };
