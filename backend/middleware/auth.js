import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  // Debug: log all headers
  console.log("AUTH HEADERS:", req.headers);
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER VALUE:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN RECEIVED:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
export default authUser;