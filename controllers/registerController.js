const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "Username and password are required." });
  }
  const duplicate = await User.findOne({ username });
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: `New user ${username} created.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
