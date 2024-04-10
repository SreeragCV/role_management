const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function jwtGenerator(user_id, role) {
  const payload = {
    user_id,
    role,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
}

module.exports = jwtGenerator;
