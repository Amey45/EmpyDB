const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../controllers/adminController");

//Protected Routes token base
module.exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, jwtSecret);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
