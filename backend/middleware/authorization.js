const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

// TOKEN VERIFICATION
exports.verifyToken = (req, res, next) => {
  let token = req.headers.token;
  if (!token)
    return res.status(401).send("Access Denied / Unauthorized Request");
  try {
    token = token.split(" ")[1];
    if (token === "null" || !token)
      return res.status(401).send("Unauthorized Request");
    let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!verifiedUser) return res.status(401).send("Unauthorized Request");
    req.user_id = verifiedUser.user_id;
    req.role = verifiedUser.role;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

// ROLE BASED AUTH
exports.isFinance = (req, res, next) => {
  if (req.role === "finance" || "admin") {
    return next();
  }
  return res.status(401).json("Not Authorized!!");
};

exports.isMarketing = (req, res, next) => {
  if (req.role === "marketing" || "admin") {
    return next();
  }
  return res.status(401).json("Not Authorized!!");
};

exports.isHumanResource = (req, res, next) => {
  if (req.role === "human-resource" || "admin") {
    return next();
  }
  return res.status(401).json("Not Authorized!!");
};

exports.isManager = (req, res, next) => {
  if (req.role === "manager" || "admin") {
    return next();
  }
  return res.status(401).json("Not Authorized!!");
};

exports.isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    return next();
  }
  return res.status(401).json("Not Authorized!!");
};

