import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const generateJWT = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const userSignup = async (req, res) => {
  try {
    const { username, password, email, avatar, adminInviteToken } = req.body;

    // check if user exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // identify user role
    let role = "member";
    if (adminInviteToken && adminInviteToken == process.env.ADMIN_TOKEN) {
      role = "admin";
    }

    // hash the password
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    // create user
    const user = await User.create({
      username,
      email,
      password: hash,
      avatar,
      role,
    });

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateJWT(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if the user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const match = bcrypt.compareSync(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid username or password" });

    // return user data with JWT
    res.status(201).json({
      _id: user.id,
      username: user.userName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateJWT(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // exclude the password field
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export { userSignup, userSignin, getUserProfile };
