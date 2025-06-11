import jwt from "jsonwebtoken";
const userVerify = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // we can extract the id because we set it as payload when sign
      req.user = { id: decoded.id };
      next();
    } else {
      res.status(401).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default userVerify;
